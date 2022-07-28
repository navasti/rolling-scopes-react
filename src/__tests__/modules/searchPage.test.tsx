import { detailedMoves, detailedPokemons, detailedTypes, localStorageMock } from '__mocks__';
import { Cards, MoveCard, PokemonCard, SearchBar, Tabs, TypeCard } from 'modules';
import { PokemonDetails, PokemonMoveDetails, PokemonTypeDetails } from 'types';
import { fireEvent, render, screen } from '@testing-library/react';
import { AvailableTabs, tabs } from 'appConstants';

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const handlePokemonSelect = (selectedPokemon: PokemonDetails) => console.log(selectedPokemon);
const handleMoveSelect = (selectedMove: PokemonMoveDetails) => console.log(selectedMove);
const handleTypeSelect = (selectedType: PokemonTypeDetails) => console.log(selectedType);
const handleModalOpened = (isModalOpened: boolean) => console.log(isModalOpened);

const pokemonCardExpectations = () => {
  const imgEl = screen.getAllByRole('img')[0];
  const { sprites, types } = detailedPokemons[0];
  const typeSpan = screen.getByText(types[0].type.name);
  expect(imgEl).toHaveAttribute('src', sprites.front_default);
  expect(typeSpan).toBeInTheDocument();
  expect(imgEl).toBeVisible();
};

const moveCardExpectations = () => {
  const moveEl = screen.getByText(detailedMoves[0].name);
  expect(moveEl).toBeInTheDocument();
  expect(moveEl).toBeVisible();
};

const typeCardExpectations = () => {
  const typeEl = screen.getByText(detailedTypes[0].name);
  expect(typeEl).toBeInTheDocument();
  expect(typeEl).toBeVisible();
};

describe('SearchPage components', () => {
  it('PokemonCard', () => {
    render(
      <PokemonCard
        handleModalOpened={handleModalOpened}
        handlePokemonSelect={handlePokemonSelect}
        pokemon={detailedPokemons[0]}
      />
    );
    pokemonCardExpectations();
  });
  it('MoveCard', () => {
    render(
      <MoveCard
        handleModalOpened={handleModalOpened}
        handleMoveSelect={handleMoveSelect}
        move={detailedMoves[0]}
      />
    );
    moveCardExpectations();
  });
  it('TypeCard', () => {
    render(
      <TypeCard
        handleModalOpened={handleModalOpened}
        handleTypeSelect={handleTypeSelect}
        type={detailedTypes[0]}
      />
    );
    typeCardExpectations();
  });
  it('SearchBar', () => {
    let inputValue = 'initial';
    let enterPressed = false;
    render(
      <SearchBar
        label="test"
        isLoading={false}
        inputValue={inputValue}
        onChange={(e) => (inputValue = e.target.value)}
        onKeyDown={({ key }) => {
          if (key === 'Enter') enterPressed = true;
        }}
      />
    );
    const input = screen.getByLabelText(/test/) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toEqual('initial');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(inputValue).toEqual('test');
    expect(enterPressed).toBeTruthy();
  });
  it('Tabs', () => {
    render(
      <Tabs
        lengths={{ pokemons: 11, moves: 22, types: 33 }}
        activeTab={AvailableTabs.pokemons}
        onClick={() => {}}
        isLoading={false}
        options={tabs}
      />
    );
    expect(screen.getByText(`${tabs[0]} (11)`)).toBeInTheDocument();
    expect(screen.getByText(`${tabs[1]} (22)`)).toBeInTheDocument();
    expect(screen.getByText(`${tabs[2]} (33)`)).toBeInTheDocument();
  });
  it('Cards with active pokemons tab', () => {
    render(
      <Cards
        activeTab={AvailableTabs.pokemons}
        pokemons={detailedPokemons}
        moves={detailedMoves}
        types={detailedTypes}
        isLoading={false}
      />
    );
    pokemonCardExpectations();
  });
  it('Cards with active moves tab', () => {
    render(
      <Cards
        activeTab={AvailableTabs.moves}
        pokemons={detailedPokemons}
        moves={detailedMoves}
        types={detailedTypes}
        isLoading={false}
      />
    );
    moveCardExpectations();
  });
  it('Cards with active types tab', () => {
    render(
      <Cards
        activeTab={AvailableTabs.types}
        pokemons={detailedPokemons}
        moves={detailedMoves}
        types={detailedTypes}
        isLoading={false}
      />
    );
    typeCardExpectations();
  });
});
