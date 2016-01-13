jest.autoMockOff();

describe('Routing:index', () => {
  let request;

  beforeEach(() => {
    request = require.requireActual('supertest');
  });

  describe('default routes', () => {
    it('handles 404s', () => {
      const app = require.requireActual('js/server/app');
      let done = false;
      let response = null;

      request(app)
        .get('/blerg')
        .end((err, res) => {
          response = res;
          done = true;
        });
      waitsFor(() => {
        if (!done) { return false; }
        expect(response.status).toEqual(404);
        return true;
      }, 'request to return');
    });
    it('handles 500s in dev mode', () => {
      const app = require.requireActual('js/server/app');

      const testroutes = require('js/server/routes/testroutes');
      testroutes.get('/500', function route500(req, res, _next) {
        throw new Error('Injected 500');
      });

      let done = false;
      let response = null;

      request(app)
        .get('/test/500')
        .end((err, res) => {
          response = res;
          done = true;
        });
      waitsFor(() => {
        if (!done) { return false; }
        expect(response.status).toEqual(500);
        return true;
      }, 'request to return');
    });
    it('handles 500s in prod mode', () => {
      const origEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
      const app = require.requireActual('js/server/app');
      process.env.NODE_ENV = origEnv;

      const testroutes = require('js/server/routes/testroutes');
      testroutes.get('/500', function route500(req, res, _next) {
        throw new Error('Injected 500');
      });

      let done = false;
      let response = null;

      request(app)
        .get('/test/500')
        .end((err, res) => {
          response = res;
          done = true;
        });
      waitsFor(() => {
        if (!done) { return false; }
        expect(response.status).toEqual(500);
        return true;
      }, 'request to return');
    });
  });
});
