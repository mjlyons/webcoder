const chai = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');
//const rewire = require('rewire');
//const mockery = require('mockery');

const expect = chai.expect;
chai.use(require('sinon-chai'));

describe('serverfs', () => {
  describe('readfile', () => {
    it('errors when trying to leave root path', () => {
      debugger;
      //mockery.enable();
      const resolveStub = sinon.stub().returns('/snuck-out');
      const serverfs = proxyquire('js/server/serverfs', {
        path: { resolve: resolveStub },
      });
      //const serverfs = rewire('js/server/serverfs');
      //serverfs.__set__({
      //  path: { resolve: resolveStub },
      //});
      //mockery.registerMock('path', { resolve: resolveStub });
      //const serverfs = require('js/server/serverfs');

      const result = serverfs.readfile('/rootpath', '../subdir');
      expect(resolveStub).to.have.been.calledOnce;
      expect(resolveStub).to.have.been.calledWith('/rootpath', '../subdir');
      expect(result).to.be.deep.equal({ error: 'not-authorized'});
      //mockery.disable();
    });

    it("errors when the file doesn't exist", () => {
      const resolveStub = sinon.stub().returns('/rootpath/subdir');
      const existsSyncStub = sinon.stub().returns(false);
      const serverfs = proxyquire('js/server/serverfs', {
        path: { resolve: resolveStub },
        fs: { existsSync: existsSyncStub },
      });

      const result = serverfs.readfile('/rootpath', 'subdir');
      expect(existsSyncStub).to.have.been.calledOnce;
      expect(existsSyncStub).to.have.been.calledWith('/rootpath/subdir');
      expect(result).to.be.deep.equal({ error: 'not-exists' });
    });

    it("errors when trying to load something other than a file", () => {
      const resolveStub = sinon.stub().returns('/rootpath/subdir');
      const existsSyncStub = sinon.stub().returns(true);
      const statSyncStub = sinon.stub().returns({ isFile: () => { return false; }});
      const serverfs = proxyquire('js/server/serverfs', {
        path: { resolve: resolveStub },
        fs: { existsSync: existsSyncStub, statSync: statSyncStub },
      });

      const result = serverfs.readfile('/rootpath', 'subdir');
      expect(statSyncStub).to.have.been.calledOnce;
      expect(statSyncStub).to.have.been.calledWith('/rootpath/subdir');
      expect(result).to.be.deep.equal({ error: 'not-file' });
    });

    it ('returns the contents of a file', () => {
      const resolveStub = sinon.stub().returns('/rootpath/file.txt');
      const existsSyncStub = sinon.stub().returns(true);
      const statSyncStub = sinon.stub().returns({ isFile: () => { return true; }});
      const readFileSyncStub = sinon.stub().returns('fake file contents');
      const serverfs = proxyquire('js/server/serverfs', {
        path: { resolve: resolveStub },
        fs: { existsSync: existsSyncStub, statSync: statSyncStub, readFileSync: readFileSyncStub },
      });

      const result = serverfs.readfile('/rootpath', 'file.txt');
      expect(readFileSyncStub).to.have.been.calledOnce;
      expect(readFileSyncStub).to.have.been.calledWith('/rootpath/file.txt', 'utf8');
      expect(result).to.be.deep.equal({
        path: '/file.txt',
        fileContents: 'fake file contents',
      });
    });
  });
});
