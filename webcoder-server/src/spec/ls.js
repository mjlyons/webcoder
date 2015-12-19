import { ls_to_json } from "../ls.js";

describe("ls_to_json", function() {
  it(" disallows using / to break out root path", function() {
    expect(ls_to_json('/srcdir', '/')).toEqual({error: 'not-authorized'});
  });
  it(" disallows using .. to break out of root path", function() {
    // TODO: actually implement this.
    expect(ls_to_json('/srcdir', '..')).toEqual({error: 'not-authorized'});
  });
  it(" handles a dir with files and folders", function() {
    // TODO: actually implement this.
    expect(true).toBe(false);
  });
  it(" handles a dir with no files or folders", function() {
    // TODO: actually implement this.
    expect(true).toBe(false);
  });
  it(" handles a non-existent path", function() {
    // TODO: actually implement this.
    expect(true).toBe(false);
  });
  it(" handles a file passed in as the path", function() {
    // TODO: actually implement this.
    expect(true).toBe(false);
  });
});
