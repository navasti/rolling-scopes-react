import { screen, render, waitForElementToBeRemoved, act } from '@testing-library/react';
import { AvailableTabs, INPUT_VALUE_KEY, TABS } from 'appConstants';
import { ChangeEvent, KeyboardEvent } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { SearchPage } from 'modules';
import {
  Lengths,
  Pokemon,
  PokemonMove,
  PokemonType,
  PokemonDetails,
  PokemonMoveDetails,
  PokemonTypeDetails,
} from 'types';
import {
  typesMock,
  movesMock,
  pokemonsMock,
  testingLocation,
  testingComponentName,
} from '__mocks__/data';
import { localStorageMock } from '__mocks__/localStorage';

type CardsProps = {
  types: Array<PokemonTypeDetails>;
  moves: Array<PokemonMoveDetails>;
  pokemons: Array<PokemonDetails>;
  activeTab: AvailableTabs;
  isLoading: boolean;
};

type LayoutProps = {
  children: JSX.Element;
  componentName: string;
  location: string;
};

type TabsProps = {
  onClick: (tab: AvailableTabs) => void;
  activeTab: AvailableTabs;
  options: typeof TABS;
  isLoading: boolean;
  lengths: Lengths;
};

type SearchBarProps = {
  onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  isLoading: boolean;
  label: string;
};

const localStorage = localStorageMock(INPUT_VALUE_KEY, 'testing-value');

Object.defineProperty(window, 'localStorage', {
  value: localStorage,
});

jest.mock('modules', () => {
  const { SearchPage } = jest.requireActual('modules/SearchPage');
  return {
    __esModule: true,
    SearchPage,
    Layout: ({ componentName, children, location }: LayoutProps) => (
      <div>
        <p>
          <span data-testid="component-mock">{componentName}</span>
          <span data-testid="location-mock">{location}</span>
        </p>
        <main>{children}</main>
      </div>
    ),
  };
});

jest.mock('modules/SearchPage/components', () => {
  return {
    __esModule: true,
    SearchBar: ({ onChange, onKeyDown }: SearchBarProps) => {
      return (
        <div>
          <div>
            <label htmlFor="input-mock">testing label</label>
            <svg />
            <input
              data-testid="input-mock"
              value="testing-value"
              onKeyDown={onKeyDown}
              onChange={onChange}
              id="input-mock"
              type="text"
            />
          </div>
          <div>
            <span>Type and press enter to search for specific pokemon, type or move.</span>
            <span>Clear input and press enter to search for all pokemons, types and moves.</span>
          </div>
        </div>
      );
    },
    Tabs: ({ isLoading, lengths }: TabsProps) => (
      <div>
        <span data-testid="pokemons-length-mock">
          pokemons {isLoading ? null : `(${lengths.moves})`}
        </span>
        <span data-testid="moves-length-mock">moves {isLoading ? null : `(${lengths.moves})`}</span>
        <span data-testid="types-length-mock">types {isLoading ? null : `(${lengths.types})`}</span>
      </div>
    ),
    Cards: (props: CardsProps) => {
      return (
        <div data-testid="cards-mock">
          {props.isLoading ? (
            <p>loading</p>
          ) : (
            <div>
              <p>{props.types[0].name}</p>
              <p>{props.moves[0].name}</p>
              <p>{props.pokemons[0].name}</p>
            </div>
          )}
        </div>
      );
    },
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

describe('SearchPage', () => {
  it('Layout should be rendered with componentName and location props given further', () => {
    act(() => {
      render(<SearchPage componentName={testingComponentName} location={testingLocation} />, {
        wrapper: BrowserRouter,
      });
    });
    expect(screen.getByTestId('component-mock')).toHaveTextContent(testingComponentName);
    expect(screen.getByTestId('location-mock')).toHaveTextContent(testingLocation);
  });
  it('Tabs should be rendered and display length of data after fetching', async () => {
    act(() => {
      render(<SearchPage componentName={testingComponentName} location={testingLocation} />, {
        wrapper: BrowserRouter,
      });
    });
    expect(screen.getByTestId('pokemons-length-mock')).toHaveTextContent('pokemons');
    expect(screen.getByTestId('moves-length-mock')).toHaveTextContent('moves');
    expect(screen.getByTestId('types-length-mock')).toHaveTextContent('types');
    expect(screen.queryByText('loading')).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryAllByText('loading'));
    expect(screen.getByTestId('pokemons-length-mock')).toHaveTextContent('pokemons (1)');
    expect(screen.getByTestId('moves-length-mock')).toHaveTextContent('moves (1)');
    expect(screen.getByTestId('types-length-mock')).toHaveTextContent('types (1)');
    expect(screen.getByText(pokemonsMock[0].name)).toBeVisible();
    expect(screen.getByText(movesMock[0].name)).toBeVisible();
    expect(screen.getByText(typesMock[0].name)).toBeVisible();
  });
  it('SearchBar should be rendered and localStorage input should be visible', () => {
    act(() => {
      render(<SearchPage componentName={testingComponentName} location={testingLocation} />, {
        wrapper: BrowserRouter,
      });
    });
    const input = screen.getByLabelText('testing label');
    const instructions = screen.getAllByText('and press enter', { exact: false });
    instructions.forEach((instruction) => expect(instruction).toBeVisible());
    expect(instructions).toHaveLength(2);
    expect(input).toBeVisible();
  });
});
