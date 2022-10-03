import { PokemonDetails, PokemonMoveDetails, PokemonTypeDetails } from 'types';
import { movesMock, pokemonsMock, typesMock } from '__mocks__/data';
import { screen, render } from '@testing-library/react';
import { AvailableTabs } from 'appConstants';

jest.mock('modules', () => {
  const React = require('react');
  return {
    __esModule: true,
    DetailsModal: React.forwardRef((_: unknown, ref: React.RefObject<HTMLDivElement>) => (
      <div ref={ref}></div>
    )),
  };
});

jest.mock('components', () => ({
  __esModule: true,
  Loader: () => <p>loading</p>,
}));

jest.mock('modules/SearchPage/components', () => {
  const { Cards } = jest.requireActual('modules/SearchPage/components/Cards');
  return {
    __esModule: true,
    Cards,
    MoveCard: ({ move }: { move: PokemonMoveDetails }) => (
      <button data-testid="move-card-mock">
        <p>{move.name}</p>
      </button>
    ),
    TypeCard: ({ type }: { type: PokemonTypeDetails }) => (
      <button data-testid="type-card-mock">
        <p>{type.name}</p>
      </button>
    ),
    PokemonCard: ({ pokemon }: { pokemon: PokemonDetails }) => {
      return (
        <button key={pokemon.id} data-testid="pokemon-card-mock">
          <div>
            <img
              // src={pokemon.sprites.front_default}
              data-testid="pokemon-img-mock"
              alt={pokemon.name}
            />
            <div>
              <span>Base:</span>
              <p>
                Name: <span>{pokemon.name}</span>
              </p>
              <p>
                Types: <span>{pokemon.types[0].type.name}</span>
              </p>
            </div>
          </div>
        </button>
      );
    },
  };
});

const customCardsRender = (
  isLoading = false,
  isData = true,
  tab: AvailableTabs = AvailableTabs.pokemons
) => (
  <></>
  // <Cards
  //   pokemons={isData ? pokemonsMock : []}
  //   moves={isData ? movesMock : []}
  //   types={isData ? typesMock : []}
  //   isLoading={isLoading}
  //   activeTab={tab}
  // />
);

describe.skip('Cards', () => {
  it('loader should be rendered and visible if isLoading prop is set to true', () => {
    render(customCardsRender(true));
    expect(screen.getByText('loading')).toBeInTheDocument();
    expect(screen.getByText('loading')).toBeVisible();
  });
  it('when pokemons are set as an active tab but no pokemons were found, display information about it', () => {
    render(customCardsRender(false, false));
    expect(screen.getByText('No pokemons were found')).toBeInTheDocument();
    expect(screen.getByText('No pokemons were found')).toBeVisible();
  });
  it('when moves are set as an active tab but no moves were found, display information about it', () => {
    render(customCardsRender(false, false, AvailableTabs.moves));
    expect(screen.getByText('No moves were found')).toBeInTheDocument();
    expect(screen.getByText('No moves were found')).toBeVisible();
  });
  it('when types are set as an active tab but no types were found, display information about it', () => {
    render(customCardsRender(false, false, AvailableTabs.types));
    expect(screen.getByText('No types were found')).toBeInTheDocument();
    expect(screen.getByText('No types were found')).toBeVisible();
  });
  it('when moves are set as an active tab, move cards should be visible and match the snapshot', () => {
    const { container } = render(customCardsRender(false, true, AvailableTabs.moves));
    const moveCards = screen.getAllByTestId('move-card-mock');
    movesMock.forEach(({ name }) => expect(screen.getByText(name)).toBeVisible());
    moveCards.forEach((card) => expect(card).toBeVisible());
    expect(moveCards).toHaveLength(movesMock.length);
    expect(container).toMatchSnapshot();
  });
  it('when types are set as an active tab, types cards should be visible and match the snapshot', () => {
    const { container } = render(customCardsRender(false, true, AvailableTabs.types));
    const typeCards = screen.getAllByTestId('type-card-mock');
    typesMock.forEach(({ name }) => expect(screen.getByText(name)).toBeVisible());
    typeCards.forEach((card) => expect(card).toBeVisible());
    expect(typeCards).toHaveLength(typesMock.length);
    expect(container).toMatchSnapshot();
  });
  it('when pokemons are set as an active tab, pokemons cards should be visible and match the snapshot', () => {
    const { container } = render(customCardsRender());
    const pokemonCards = screen.getAllByTestId('pokemon-card-mock');
    const pokemonImages = screen.getAllByTestId('pokemon-img-mock');
    pokemonsMock.forEach(({ name }) => expect(screen.getByText(name)).toBeVisible());
    pokemonImages.forEach((image) => expect(image).toBeVisible());
    pokemonCards.forEach((card) => expect(card).toBeVisible());
    expect(pokemonCards).toHaveLength(pokemonsMock.length);
    expect(container).toMatchSnapshot();
  });
});
