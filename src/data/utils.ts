export const urlQueryBuilder = () => {
  const params: string[] = [];

  const fluentApi = {
    add: (key: string, value: string | null) => {
      params.push(`${key}=${value}`);
      return fluentApi;
    },
    build: () => {
      return params.join('&');
    },
  };

  return fluentApi;
};
