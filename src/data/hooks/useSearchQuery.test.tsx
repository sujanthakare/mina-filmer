import { Provider } from 'react-redux';

import { Store, configureStore } from '@reduxjs/toolkit';
import { act, renderHook } from '@testing-library/react-hooks';

import useSearchQuery from './useSearchQuery';

const render_useSearchQuery = (mockStore: Store) => {
  const wrapper = ({ children }: any) => (
    <Provider store={mockStore}>{children}</Provider>
  );

  return renderHook(() => useSearchQuery(), {
    wrapper,
  });
};

describe('useSearchQuery', () => {
  let mockStore: Store;

  beforeEach(() => {
    mockStore = configureStore({ reducer: {} });
  });

  it('should return default query text and page', () => {
    const { result } = render_useSearchQuery(mockStore);

    expect(result.current.queryPage).toBe(1);
    expect(result.current.queryText).toBe('');
  });

  it('should update query page', () => {
    const { result } = render_useSearchQuery(mockStore);

    act(() => {
      result.current.setQueryPage(2);
    });

    expect(result.current.queryPage).toBe(2);
    expect(result.current.queryText).toBe('');
  });

  it('should update query text', () => {
    const { result } = render_useSearchQuery(mockStore);

    const queryText = 'search query';
    act(() => {
      result.current.setQueryText(queryText);
    });

    expect(result.current.queryPage).toBe(1);
    expect(result.current.queryText).toBe(queryText);
  });
});
