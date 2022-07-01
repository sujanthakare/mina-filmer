import StorageService from './storage-service';

const localStorageGetItemSpy = jest.spyOn(
  Object.getPrototypeOf(window.localStorage),
  'getItem'
);

describe('StorageService', () => {
  describe('get', () => {
    beforeEach(() => {
      localStorageGetItemSpy.mockClear();
    });

    it('should get valid value', () => {
      const demoValue = {
        key: 'value',
      };

      localStorageGetItemSpy.mockImplementation(
        jest.fn().mockReturnValue(JSON.stringify(demoValue))
      );

      const value = StorageService.get('DEMO_KEY');
      expect(value).toHaveProperty('key', 'value');
    });

    it('should return null if no value present in localStorage', () => {
      localStorageGetItemSpy.mockImplementation(
        jest.fn().mockReturnValue(undefined)
      );

      const value = StorageService.get('DEMO_KEY');
      expect(value).toEqual(null);
    });
  });
});
