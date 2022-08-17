import { handleCardSelect, handleOpenModal } from '__mocks__/handlers';
import { screen, render, fireEvent } from '@testing-library/react';
import { PokemonCard } from 'modules/SearchPage/components';
import { pokemonsMock } from '__mocks__/data';

describe('PokemonCard', () => {
  jest.useFakeTimers();
  afterEach(() => {
    handleOpenModal.mockReset();
    handleCardSelect.mockReset();
  });
  it('pokemon card should be rendered and match snapshot', () => {
    const { container } = render(
      <PokemonCard
        handlePokemonSelect={handleCardSelect}
        handleOpenModal={handleOpenModal}
        pokemon={pokemonsMock[0]}
      />
    );
    expect(container.children.length).toBeGreaterThan(0);
    expect(container).toMatchSnapshot();
  });
  it('pokemon card should render base pokemon information', () => {
    render(
      <PokemonCard
        handlePokemonSelect={handleCardSelect}
        handleOpenModal={handleOpenModal}
        pokemon={pokemonsMock[0]}
      />
    );
    expect(screen.getByText(`Name: ${pokemonsMock[0].name}`)).toBeInTheDocument();
    expect(screen.getByText(pokemonsMock[0].types[0].type.name)).toBeInTheDocument();
  });
  it('clicking on card should invoke handleOpenModal and handlePokemonSelect methods', () => {
    render(
      <PokemonCard
        handlePokemonSelect={handleCardSelect}
        handleOpenModal={handleOpenModal}
        pokemon={pokemonsMock[0]}
      />
    );
    expect(handleCardSelect).not.toHaveBeenCalled();
    expect(handleOpenModal).not.toHaveBeenCalled();
    fireEvent.click(screen.getByTestId('pokemon-card'));
    expect(handleCardSelect).toHaveBeenCalledWith(pokemonsMock[0]);
    expect(handleCardSelect).toHaveBeenCalledTimes(1);
    jest.runAllTimers();
    expect(handleOpenModal).toHaveBeenCalledWith();
    expect(handleOpenModal).toHaveBeenCalledTimes(1);
  });
});
