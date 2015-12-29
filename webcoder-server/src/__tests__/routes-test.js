jest.autoMockOff();
jest.mock('../fswrap');
jest.mock('../localsettings.js');

const mockLocalsettings = {
  ROOT_SOURCE_PATH: '/my-root-src',
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

  beforeEach(() => {
    const localsettings = require('../localsettings');
    localsettings.mockReturnValue(mockLocalsettings);
    app = require('../app');
    request = require('supertest');
  });

  describe('/ls endpoint', () => {
    it('handles /ls for a valid path', () => {
      const fs = require('../fswrap');
      let done = false;
      let requestError = null;
      let response = null;

      fs.readdirSync.mockReturnValue(['myDir', 'myFile.txt']);
      fs.existsSync.mockReturnValueOnce(true);
      fs.statSync.mockReturnValueOnce(statResultDir)
        .mockReturnValueOnce(statResultDir)
        .mockReturnValueOnce(statResultFile);

      request(app)
        .get('/ls/somedir')
        .end((err, res) => {
          response = res;
          requestError = err;
          done = true;
        });
      waitsFor(() => {
        if (!done) { return false; }
        expect(requestError).toEqual(null);
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
      let requestError = null;
      let response = null;
      const fs = require('../fswrap');
      fs.existsSync.mockReturnValueOnce(false);

      request(app)
        .get('/ls/somedir')
        .end((err, res) => {
          response = res;
          requestError = err;
          done = true;
        });
      waitsFor(() => {
        if (!done) { return false; }
        expect(requestError).toEqual(null);
        expect(response.status).toEqual(404);
        return true;
      }, 'request to return');
    });

    it('handles /ls for a disallowed path', () => {
      let done = false;
      let requestError = null;
      let response = null;

      request(app)
        .get('/ls/../somedir')
        .expect(403)
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
  });
});
