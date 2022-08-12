import { movesMock, pokemonsMock, typesMock } from '__mocks__/data';
import { screen, render } from '@testing-library/react';
import { handleCloseModal } from '__mocks__/handlers';
import { DetailsModal } from 'modules';

jest.mock('modules/DetailsModal/components', () => {
  const { ComponentMocks } = require('__mocks__/elements');
  return {
    __esModule: true,
    MoveModalContent: ComponentMocks.MoveModalContent,
    TypeModalContent: ComponentMocks.TypeModalContent,
    PokemonModalContent: ComponentMocks.PokemonModalContent,
  };
});

jest.mock('components', () => {
  const { ComponentMocks } = require('__mocks__/elements');
  return {
    __esModule: true,
    Modal: ComponentMocks.Modal,
  };
});

describe('DetailsModal', () => {
  it('details modal should not be render if recived and passed open prop equals false', () => {
    const { container } = render(
      <DetailsModal handleCloseModal={handleCloseModal} isModalOpened={false} />
    );
    expect(container).toBeEmptyDOMElement();
  });
  it('move title and details should be rendered when selectedMove provided', () => {
    render(
      <DetailsModal
        handleCloseModal={handleCloseModal}
        selectedMove={movesMock[0]}
        isModalOpened={true}
      />
    );
    expect(screen.getByText(movesMock[0].name)).toBeInTheDocument();
    expect(screen.getByText(String(movesMock[0].id))).toBeInTheDocument();
  });
  it('pokemon title and details should be rendered when selectedPokemon provided', () => {
    render(
      <DetailsModal
        handleCloseModal={handleCloseModal}
        selectedPokemon={pokemonsMock[0]}
        isModalOpened={true}
      />
    );
    expect(screen.getByText(pokemonsMock[0].name)).toBeInTheDocument();
    expect(screen.getByText(String(pokemonsMock[0].id))).toBeInTheDocument();
  });
  it('type title and details should be rendered when selectedType provided', () => {
    render(
      <DetailsModal
        handleCloseModal={handleCloseModal}
        selectedType={typesMock[0]}
        isModalOpened={true}
      />
    );
    expect(screen.getByText(typesMock[0].name)).toBeInTheDocument();
    expect(screen.getByText(String(typesMock[0].id))).toBeInTheDocument();
  });
});
