class StorageServiceFactory {
  get<T = unknown>(key: string): T | null {
    const values = localStorage.getItem(key);

    if (values) {
      return JSON.parse(values) as T;
    }

    return null;
  }

  save(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

const StorageService = new StorageServiceFactory();

export default StorageService;
