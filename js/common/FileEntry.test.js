import { FileEntry, Filetypes } from 'js/common/FileEntry';

describe('FileEntry', () => {
  it('returns a filename for a file inside a subfolder', () => {
    const entry = new FileEntry({ filetype: Filetypes.FILE, path: '/subfolder/file.txt' });
    expect(entry.filename).toEqual('file.txt');
  });
  it('returns a filename for a file inside root', () => {
    const entry = new FileEntry({ filetype: Filetypes.FILE, path: '/file.txt' });
    expect(entry.filename).toEqual('file.txt');
  });
  it('returns a filename for a folder with a trailing slash (/)', () => {
    const entry = new FileEntry({ filetype: Filetypes.FILE, path: '/folder/' });
    expect(entry.filename).toEqual('folder');
  });
  it('returns a slash (/) for root', () => {
    const entry = new FileEntry({ filetype: Filetypes.FOLDER, path: '/' });
    expect(entry.filename).toEqual('/');
  });
  it('toString() description', () => {
    const entry = new FileEntry({ filetype: Filetypes.FILE, path: '/file.txt' });
    expect(entry.toString()).toEqual('/file.txt - FILE');
  });
});
