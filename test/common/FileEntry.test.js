const chai = require('chai');
const expect = chai.expect;

const { FileEntry, Filetypes } = require('js/common/FileEntry');

describe('FileEntry', () => {
  it('returns a filename for a file inside a subfolder', () => {
    const entry = new FileEntry({ filetype: Filetypes.FILE, path: '/subfolder/file.txt' });
    expect(entry.filename).to.equal('file.txt');
  });
  it('returns a filename for a file inside root', () => {
    const entry = new FileEntry({ filetype: Filetypes.FILE, path: '/file.txt' });
    expect(entry.filename).to.equal('file.txt');
  });
  it('returns a filename for a folder with a trailing slash (/)', () => {
    const entry = new FileEntry({ filetype: Filetypes.FILE, path: '/folder/' });
    expect(entry.filename).to.equal('folder');
  });
  it('returns a slash (/) for root', () => {
    const entry = new FileEntry({ filetype: Filetypes.FOLDER, path: '/' });
    expect(entry.filename).to.equal('/');
  });
  it('toString() description', () => {
    const entry = new FileEntry({ filetype: Filetypes.FILE, path: '/file.txt' });
    expect(entry.toString()).to.equal('/file.txt - Symbol(FILE)');
  });
});
