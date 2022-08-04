import { screen, render } from '@testing-library/react';
import { SearchPage } from 'modules';

jest.mock('modules/Tescik/components', () => ({
  __esModule: true,
  Tabs: () => <></>,
  Cards: () => <></>,
  MoveCard: () => <></>,
  TypeCard: () => <></>,
  SearchBar: () => <></>,
  PokemonCard: () => <></>,
}));

jest.mock('components', () => ({
  __esModule: true,
  Loader: () => <></>,
}));

describe('', () => {
  it('', () => {});
});
