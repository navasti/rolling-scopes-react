import { screen, render } from '@testing-library/react';
import { Cards } from 'modules/SearchPage/components';

jest.mock('components', () => ({
  __esModule: true,
  Loader: () => <p data-testid="loader">loading</p>,
}));

describe('', () => {
  it('', () => {});
});
