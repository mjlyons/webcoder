jest.autoMockOff();
jest.mock('settings');
jest.mock('js/server/fswrap');

/**
 * Server-integration tests. Makes requests to the server as if it were the
 * client and verifies the result.
 *
 * @todo Add tests to make sure authenticated json requests enforce auth
 * @todo Add tests for logging in/out
 */

const mockLocalsettings = {
  ROOT_SOURCE_PATH: '/my-root-src',
  SESSION_SECRET: 'session-secret',
  userRecords: [
    {
      id: 1,
      username: 'testuser',
      displayName: 'Test User',
      emails: ['testuser@example.org'],
      passhash: '$2a$10$vohRxRVFiavPH766eBy6eOJWa1vbElTm202f4Qd9TM9ZucxYQ1lo.',  // password: "testpass"
    },
  ],

};

const statResultFile = {
  isFile: () => { return true; },
  isDirectory: () => { return false; },
};

const statResultDir = {
  isFile: () => { return false; },
  isDirectory: () => { return true; },
};

describe('Routing:index', () => {
  let app;
  let request;
  let agent;

  beforeEach(() => {
    const settings = require('settings');
    settings.mockReturnValue(mockLocalsettings);
    app = require.requireActual('js/server/app');

    request = require.requireActual('supertest');
    agent = request.agent(app);

    let done = false;
    agent
      .post('/login')
      .send({ username: 'testuser', password: 'testpass' })
      .end((err, res) => {
        done = true;
      });
    waitsFor(() => {
      if (!done) { return false; }
      return true;
    }, 'request to return');
  });

  describe('/ls endpoint', () => {
    it('handles /ls for a valid path', () => {
      const fs = require('../fswrap');
      let done = false;
      let response = null;

      fs.readdirSync.mockReturnValue(['myDir', 'myFile.txt']);
      fs.existsSync.mockReturnValueOnce(true);
      fs.statSync.mockReturnValueOnce(statResultDir)
        .mockReturnValueOnce(statResultDir)
        .mockReturnValueOnce(statResultFile);
      agent
        .get('/ls/somedir')
        .end((err, res) => {
          response = res;
          done = true;
        });
      waitsFor(() => {
        if (!done) { return false; }
        expect(response.status).toEqual(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body).toEqual({
          'path': '/somedir',
          'contents': {
            'myDir': { 'type': 'dir' },
            'myFile.txt': { 'type': 'file' },
          },
        });
        return true;
      }, 'request to return');
    });

    it('handles /ls for a non-existent path', () => {
      let done = false;
      let response = null;
      const fs = require('../fswrap');
      fs.existsSync.mockReturnValueOnce(false);

      agent
        .get('/ls/somedir')
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

    it('handles /ls for a disallowed path', () => {
      let done = false;
      let requestError = null;
      let response = null;

      agent
        .get('/ls/../somedir')
        .end((err, res) => {
          response = res;
          requestError = err;
          done = true;
        });
      waitsFor(() => {
        if (!done) { return false; }
        expect(requestError).toEqual(null);
        expect(response.status).toEqual(403);
        return true;
      }, 'request to return');
    });

    it('handles /ls for a file', () => {
      const fs = require('../fswrap');
      let done = false;
      let response = null;

      fs.readdirSync.mockReturnValue(['myFile.txt']);
      fs.existsSync.mockReturnValueOnce(true);
      fs.statSync.mockReturnValueOnce(statResultFile);

      agent
        .get('/ls/myFile.txt')
        .end((err, res) => {
          response = res;
          done = true;
        });
      waitsFor(() => {
        if (!done) { return false; }
        expect(response.status).toEqual(405);
        return true;
      }, 'request to return');
    });
  });
});
