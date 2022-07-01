import { urlQueryBuilder } from './utils';

describe('utils', () => {
  it('should handle single query params', () => {
    const queryParams = urlQueryBuilder().add('key', 'value').build();
    expect(queryParams).toEqual('key=value');
  });

  it('should handle multiple query params', () => {
    const queryParams = urlQueryBuilder()
      .add('key', 'value')
      .add('key1', 'value1')
      .build();

    expect(queryParams).toEqual('key=value&key1=value1');
  });

  it('should handle empty query params', () => {
    const queryParams = urlQueryBuilder().add('', '').build();

    expect(queryParams).toEqual('');
  });
});

// api.backend.com/users/1?language=en-US&city=pune&state=maharashtra
