import { handleCloseModal, movesMock, pokemonsMock, typesMock } from '__mocks__';
import { PokemonDetails, PokemonMoveDetails, PokemonTypeDetails } from 'types';
import { screen, render } from '@testing-library/react';
import { DetailsModal } from 'modules';

type ModalProps = {
  children: [JSX.Element, JSX.Element];
  handleCloseModal: () => void;
  opened: boolean;
};

jest.mock('modules/DetailsModal/components', () => ({
  __esModule: true,
  MoveModalContent: ({ selectedMove }: { selectedMove: PokemonMoveDetails }) => (
    <span>{selectedMove.id}</span>
  ),
  PokemonModalContent: ({ selectedPokemon }: { selectedPokemon: PokemonDetails }) => (
    <span>{selectedPokemon.id}</span>
  ),
  TypeModalContent: ({ selectedType }: { selectedType: PokemonTypeDetails }) => (
    <span>{selectedType.id}</span>
  ),
}));

jest.mock('components', () => ({
  __esModule: true,
  Modal: ({ children, opened, handleCloseModal }: ModalProps) =>
    opened && (
      <div>
        <header>
          <p data-testid="details-title">{children[0]}</p>
          <button onClick={handleCloseModal}>
            <svg></svg>
          </button>
        </header>
        <div data-testid="details-content">{children[1]}</div>
      </div>
    ),
}));

const expectContentAndTitleValues = (titleText: string, contentText: string) => {
  const titleElement = screen.getByTestId('details-title').querySelector('span');
  const contentElement = screen.getByTestId('details-content').querySelector('span');
  expect(titleElement).toBeInTheDocument();
  expect(contentElement).toBeInTheDocument();
  expect(titleElement).toHaveTextContent(titleText);
  expect(contentElement).toHaveTextContent(contentText);
};

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
    expectContentAndTitleValues(movesMock[0].name, String(movesMock[0].id));
  });
  it('pokemon title and details should be rendered when selectedPokemon provided', () => {
    render(
      <DetailsModal
        handleCloseModal={handleCloseModal}
        selectedPokemon={pokemonsMock[0]}
        isModalOpened={true}
      />
    );
    expectContentAndTitleValues(pokemonsMock[0].name, String(pokemonsMock[0].id));
  });
  it('type title and details should be rendered when selectedType provided', () => {
    render(
      <DetailsModal
        handleCloseModal={handleCloseModal}
        selectedType={typesMock[0]}
        isModalOpened={true}
      />
    );
    expectContentAndTitleValues(typesMock[0].name, String(typesMock[0].id));
  });
});
