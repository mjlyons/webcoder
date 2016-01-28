const chai = require('chai');
const expect = chai.expect;

const SourcePath = require('js/common/SourcePath');

describe('SourcePath', () => {
  describe('getParentPath', () => {
    it('returns the parent folder', () => {
      const parentPath = SourcePath.getParentPath('/parentFolder/childFolder');
      expect(parentPath).to.equal('/parentFolder/');
    });

    it('returns the parent folder when it is root', () => {
      const parentPath = SourcePath.getParentPath('/childFolder');
      expect(parentPath).to.equal('/');
    });

    it('returns null when child folder is root', () => {
      const parentPath = SourcePath.getParentPath('/');
      expect(parentPath).to.equal(null);
    });
  });
});
