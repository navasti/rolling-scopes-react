import { screen, render, waitForElementToBeRemoved } from '@testing-library/react';
import { localStorageMock } from '__mocks__/localStorage';
import { BrowserRouter } from 'react-router-dom';
import { INPUT_VALUE_KEY } from 'appConstants';
import { SearchPage } from 'modules';
import {
  Pokemon,
  PokemonMove,
  PokemonType,
  PokemonDetails,
  PokemonMoveDetails,
  PokemonTypeDetails,
} from 'types';
import {
  testingComponentName,
  testingLocation,
  pokemonsMock,
  movesMock,
  typesMock,
} from '__mocks__/data';

const localStorage = localStorageMock(INPUT_VALUE_KEY, 'testing-value');

Object.defineProperty(window, 'localStorage', {
  value: localStorage,
});

jest.mock('modules', () => {
  const { ComponentMocks } = require('__mocks__/elements.tsx');
  const { SearchPage } = jest.requireActual('modules/SearchPage');
  return {
    __esModule: true,
    SearchPage,
    Layout: ComponentMocks.Layout,
  };
});

jest.mock('modules/SearchPage/components', () => {
  const { ComponentMocks } = require('__mocks__/elements.tsx');
  return {
    __esModule: true,
    Tabs: ComponentMocks.Tabs,
    Cards: ComponentMocks.Cards,
    SearchBar: ComponentMocks.SearchBar,
  };
});

jest.mock('utils/api.ts', () => {
  const { pokemonsMock, movesMock, typesMock } = require('__mocks__/data');
  return {
    _esModule: true,
    fetchTypeByParameter: async () => Promise.resolve(typesMock[0]),
    fetchMoveByParameter: async () => Promise.resolve(movesMock[0]),
    fetchPokemonByParameter: async () => Promise.resolve(pokemonsMock[0]),
    fetchPokemonBase: async (): Promise<Array<Pokemon>> => Promise.resolve([]),
    fetchMoveBase: async (): Promise<Array<PokemonMove>> => Promise.resolve([]),
    fetchTypeBase: async (): Promise<Array<PokemonType>> => Promise.resolve([]),
    fetchTypeDetails: async (): Promise<PokemonTypeDetails[]> => Promise.resolve(typesMock),
    fetchMoveDetails: async (): Promise<PokemonMoveDetails[]> => Promise.resolve(movesMock),
    fetchPokemonDetails: async (): Promise<PokemonDetails[]> => Promise.resolve(pokemonsMock),
  };
});

describe.skip('SearchPage', () => {
  it('should match snapshot before and after data fetching', async () => {
    const { container } = render(
      <SearchPage componentName={testingComponentName} location={testingLocation} />,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(container).toMatchSnapshot();
    await waitForElementToBeRemoved(() => screen.queryAllByText('loading'));
    expect(container).toMatchSnapshot();
  });
  it('loader should be rendered initially and replaced by cards after data fetching search bar should be static', async () => {
    render(<SearchPage componentName={testingComponentName} location={testingLocation} />, {
      wrapper: BrowserRouter,
    });
    const input = screen.getByLabelText('testing label');
    const instructions = screen.getAllByText(/and press enter/i, { exact: false });
    instructions.forEach((instruction) => expect(instruction).toBeVisible());

    expect(instructions).toHaveLength(2);
    expect(input).toBeVisible();

    expect(screen.getByTestId('component-mock')).toHaveTextContent(testingComponentName);
    expect(screen.getByTestId('location-mock')).toHaveTextContent(testingLocation);

    expect(screen.getByTestId('pokemons-length-mock')).toHaveTextContent('pokemons');
    expect(screen.getByTestId('moves-length-mock')).toHaveTextContent('moves');
    expect(screen.getByTestId('types-length-mock')).toHaveTextContent('types');

    await waitForElementToBeRemoved(() => screen.queryAllByText('loading'));

    expect(screen.getByTestId('pokemons-length-mock')).toHaveTextContent('pokemons (1)');
    expect(screen.getByTestId('moves-length-mock')).toHaveTextContent('moves (1)');
    expect(screen.getByTestId('types-length-mock')).toHaveTextContent('types (1)');

    expect(screen.getByText(pokemonsMock[0].name)).toBeVisible();
    expect(screen.getByText(movesMock[0].name)).toBeVisible();
    expect(screen.getByText(typesMock[0].name)).toBeVisible();
  });
});
