jest.autoMockOff();

describe('Routing:index', () => {
  let request;
  let app;

  beforeEach(() => {
    request = require.requireActual('supertest');
    app = require.requireActual('js/server/app');
  });

  describe('default routes', () => {
    it('handles 404s', () => {
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
  });
});
