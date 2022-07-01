import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import Header from './header';

describe('Header', () => {
  it('should match snapshot', () => {
    const { container } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(container).toMatchSnapshot();
  });
});
