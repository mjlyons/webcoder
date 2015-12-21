jest.autoMockOff();
jest.mock('../fswrap');
jest.mock('../localsettings.js');

const mockLocalsettings = {
  ROOT_SOURCE_PATH : '/my-root-src',
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
    let localsettings = require('../localsettings');
    localsettings.mockReturnValue(mockLocalsettings);
    app = require('../app');
    request = require('supertest');
  });

  it('handles /ls for a valid path', () => {
    let done = false;
    let fs = require('../fswrap');
    fs.readdirSync.mockReturnValue(['myDir', 'myFile.txt']);
    fs.existsSync.mockReturnValueOnce(true);
    fs.statSync.mockReturnValueOnce(statResultDir)
      .mockReturnValueOnce(statResultDir)
      .mockReturnValueOnce(statResultFile);

    runs(() => {
      request(app)
        .get('/ls/somedir')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          done = true;
          if (err) { throw err; }
          expect(res.body).toEqual({
            'path': '/my-root-src/somedir',
            'contents': {
              'myDir': { 'type': 'dir' },
              'myFile.txt': { 'type': 'file' },
            },
          });
        });
    });

    waitsFor(() => {
      return done;
    }, 'request to return');
  });

  it('handles /ls for a non-existent path', () => {
    let done = false;
    let fs = require('../fswrap');
    fs.existsSync.mockReturnValueOnce(false);

    runs(() => {
      request(app)
        .get('/ls/somedir')
        .expect(404)
        .end((err, res) => {
          done = true;
          if (err) { throw err; }
        });
    });

    waitsFor(() => {
      return done;
    }, 'request to return');
  });

  it('handles /ls for a disallowed path', () => {
    let done = false;
    runs(() => {
      request(app)
        .get('/ls/../somedir')
        .expect(403)
        .end((err, res) => {
          done = true;
          if (err) { throw err; }
        });
    });

    waitsFor(() => {
      return done;
    }, 'request to return');
  });
});
