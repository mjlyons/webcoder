const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
chai.use(require('sinon-chai'));

const statResultFile = {
  isFile: () => { return true; },
  isDirectory: () => { return false; },
};

const statResultDir = {
  isFile: () => { return false; },
  isDirectory: () => { return true; },
};

function authAgent(agent, onAuthed) {
  agent
    .post('/login')
    .send({ username: 'testuser', password: 'testpass' })
    .end((err, _res) => {
      expect(err).to.be.null;
      onAuthed();
    });
}

describe('Routing:index', () => {
  describe('/ls endpoint', () => {
    let app;
    let request;
    let agent;
    let fswrap;

    beforeEach(() => {
      app = require('js/server/app');
      request = require('supertest');
      agent = request.agent(app);

      // Set up fake server filesystem
      fswrap = require('js/server/fswrap');
      const existsSyncStub = sinon.stub(fswrap, 'existsSync');
      const readdirSyncStub = sinon.stub(fswrap, 'readdirSync');
      const statSyncStub = sinon.stub(fswrap, 'statSync');
      existsSyncStub.withArgs('/example/webcoder/somedir').returns(true);
      readdirSyncStub.withArgs('/example/webcoder/somedir').returns(['myDir', 'myFile.txt']);
      statSyncStub.withArgs('/example/webcoder/somedir').returns(statResultDir);
      statSyncStub.withArgs('/example/webcoder/somedir/myDir').returns(statResultDir);
      existsSyncStub.withArgs('/example/webcoder/somedir/myFile.txt').returns(true);
      statSyncStub.withArgs('/example/webcoder/somedir/myFile.txt').returns(statResultFile);
      existsSyncStub.returns(false);
    });

    afterEach(() => {
      fswrap.existsSync.restore();
      fswrap.readdirSync.restore();
      fswrap.statSync.restore();
    });

    it('handles /ls for a valid path', (done) => {
      authAgent(agent, () => {
        agent
        .get('/ls/somedir')
        .expect(200)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res.headers['content-type']).to.match(/json/);
          expect(res.body).to.deep.equal({
            'path': '/somedir',
            'contents': {
              'myDir': { 'type': 'dir' },
              'myFile.txt': { 'type': 'file' },
            },
          });
          done();
        });
      });
    });

    it('handles /ls for a non-existent path', (done) => {
      authAgent(agent, () => {
        agent
        .get('/ls/not-a-dir')
        .expect(404, done);
      });
    });

    it('handles /ls for a disallowed path', (done) => {
      authAgent(agent, () => {
        agent
        .get('/ls/../somedir')
        .expect(403, done);
      });
    });

    it('handles /ls for a file', (done) => {
      authAgent(agent, () => {
        agent
        .get('/ls/somedir/myFile.txt')
        .expect(405, done);
      });
    });
  });
});
