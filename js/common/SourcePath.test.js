import SourcePath from 'js/common/SourcePath';

describe('SourcePath', () => {
  describe('getParentPath', () => {
    it('returns the parent folder', () => {
      const parentPath = SourcePath.getParentPath('/parentFolder/childFolder');
      expect(parentPath).toEqual('/parentFolder/');
    });

    it('returns the parent folder when it is root', () => {
      const parentPath = SourcePath.getParentPath('/childFolder');
      expect(parentPath).toEqual('/');
    });

    it('returns null when child folder is root', () => {
      const parentPath = SourcePath.getParentPath('/');
      expect(parentPath).toEqual(null);
    });
  });
});
