import { screen, render, fireEvent } from '@testing-library/react';
import { SearchBar } from 'modules/SearchPage/components';
import { SEARCH_BAR_INSTRUCTIONS } from 'appConstants';

const onSearchChange = jest.fn();
const onSearchKeyDown = jest.fn();

const getInput = (label: string): HTMLInputElement => screen.getByLabelText(label);

describe.skip('SearchBar', () => {
  afterEach(() => {
    onSearchChange.mockReset();
    onSearchKeyDown.mockReset();
  });
  it('search bar should display passed label, input value and match snapshot', () => {
    const { container } = render(
      <SearchBar
        inputValue="input-value"
        inputDisabled={false}
        label="search-bar-label"
        onChange={onSearchChange}
        onKeyDown={onSearchKeyDown}
      />
    );
    expect(getInput('search-bar-label')).toHaveValue('input-value');
    expect(getInput('search-bar-label')).not.toBeDisabled();
    expect(container).toMatchSnapshot();
  });
  it('search bar input should be disabled when isLoading prop equals true', () => {
    render(
      <SearchBar
        inputValue="input-value"
        inputDisabled={false}
        label="search-bar-label"
        onChange={onSearchChange}
        onKeyDown={onSearchKeyDown}
      />
    );
    expect(getInput('search-bar-label')).toBeDisabled();
  });
  it('search bar should invoke onChange method when input value changes', () => {
    render(
      <SearchBar
        inputValue="input-value"
        inputDisabled={false}
        label="search-bar-label"
        onChange={onSearchChange}
        onKeyDown={onSearchKeyDown}
      />
    );
    expect(onSearchChange).toBeCalledTimes(0);
    fireEvent.change(getInput('search-bar-label'), {
      target: { value: 'aa' },
    });
    expect(onSearchChange).toBeCalledTimes(1);
  });

  it('search bar should invoke onKeyDown method when any key is pressed', () => {
    render(
      <SearchBar
        inputValue="input-value"
        inputDisabled={false}
        label="search-bar-label"
        onChange={onSearchChange}
        onKeyDown={onSearchKeyDown}
      />
    );
    expect(onSearchKeyDown).toBeCalledTimes(0);
    fireEvent.keyDown(getInput('search-bar-label'));
    expect(onSearchKeyDown).toBeCalledTimes(1);
  });
  it('search bar input with icon should be rendered and visible', () => {
    render(
      <SearchBar
        inputValue="input-value"
        inputDisabled={false}
        label="search-bar-label"
        onChange={onSearchChange}
        onKeyDown={onSearchKeyDown}
      />
    );
    expect(screen.getByTestId('search-icon')).toBeVisible();
    expect(getInput('search-bar-label')).toBeVisible();
  });
  it('search bar instructions should be rendered and visible', () => {
    render(
      <SearchBar
        inputValue="input-value"
        inputDisabled={false}
        label="search-bar-label"
        onChange={onSearchChange}
        onKeyDown={onSearchKeyDown}
      />
    );
    SEARCH_BAR_INSTRUCTIONS.forEach((instruction) => {
      expect(screen.getByText(instruction)).toBeInTheDocument();
      expect(screen.getByText(instruction)).toBeVisible();
    });
  });
});
