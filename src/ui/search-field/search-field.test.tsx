import { fireEvent, render, screen } from '@testing-library/react';

import SearchField from './search-field';

jest.useFakeTimers();

describe('SearchField', () => {
  it('should render', () => {
    render(<SearchField value="" />);
    const element = screen.queryByTestId('search-field');

    expect(element).toBeInTheDocument();
  });

  it('should call onChange callback if value has changed', () => {
    const mockedOnChange = jest.fn();

    render(<SearchField value="" onChange={mockedOnChange} />);
    const element = screen.getByTestId('search-field');
    fireEvent.change(element, { target: { value: 'new' } });

    jest.runAllTimers();

    expect(mockedOnChange).toBeCalled();
  });

  it('should debounce onChange callback if value changed rapidly', () => {
    const mockedOnChange = jest.fn();

    render(<SearchField value="" onChange={mockedOnChange} />);

    const element = screen.getByTestId('search-field');

    fireEvent.change(element, { target: { value: 't' } });
    fireEvent.change(element, { target: { value: 'te' } });
    fireEvent.change(element, { target: { value: 'tex' } });
    fireEvent.change(element, { target: { value: 'text' } });
    jest.runOnlyPendingTimers();
    expect(element).toHaveDisplayValue('text');
    expect(mockedOnChange).toBeCalledTimes(1);

    fireEvent.change(element, { target: { value: 'text value' } });
    jest.runOnlyPendingTimers();
    expect(element).toHaveDisplayValue('text value');
    expect(mockedOnChange).toBeCalledTimes(2);
  });
});
