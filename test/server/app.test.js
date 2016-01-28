const request = require('supertest');
const path = require('path');
const chai = require('chai');
const expect = chai.expect;

describe('routing:defaults', () => {
  const origNodeEnv = process.env.NODE_ENV;

  beforeEach(() => {
  });

  afterEach(() => {
    // Restore original NODE_ENV (determines prod vs dev mode)
    process.env.NODE_ENV = origNodeEnv;

    // Force app module to reload after each test
    delete require.cache[path.resolve('js/server/app.js')];
  });

  it('handles 404s', (done) => {
    const app = require('js/server/app');
    request(app)
    .get('/blerg')
    .expect(404, done);
  });

  it('handles 500s in dev mode', (done) => {
    process.env.NODE_ENV = 'development';
    const app = require('js/server/app');
    const testroutes = require('js/server/routes/testroutes');
    testroutes.get('/500', function route500(req, res, _next) {
      throw new Error('Injected 500');
    });
    request(app)
    .get('/test/500')
    .expect(500, done);
  });

  it('handles 500s in prod mode', (done) => {
    process.env.NODE_ENV = 'production';
    const app = require('js/server/app.js');
    const testroutes = require('js/server/routes/testroutes');
    testroutes.get('/500', function route500(req, res, _next) {
      throw new Error('Injected 500');
    });
    request(app)
    .get('/test/500')
    .expect(500, done);
  });

  it('redirects to the editor when access a protected url and not logged in', (done) => {
    const app = require('js/server/app.js');
    request.agent(app)
    .post('/login')
    .send({ username: 'testuser', password: 'testpass' })
    .end((err, res) => {
      expect(res.header.location).to.include('/editor');
      done();
    });
  });

  it('redirects back to the editor try logging in with bad username', (done) => {
    const app = require('js/server/app.js');
    request.agent(app)
    .post('/login')
    .send({ username: 'baduser', password: 'testpass' })
    .end((err, res) => {
      expect(res.header.location).to.include('/login');
      done();
    });
  });

  it('redirects back to the editor try logging in with bad password', (done) => {
    const app = require('js/server/app.js');
    request.agent(app)
    .post('/login')
    .send({ username: 'testuser', password: 'badpass' })
    .end((err, res) => {
      expect(res.header.location).to.include('/login');
      done();
    });
  });
});
