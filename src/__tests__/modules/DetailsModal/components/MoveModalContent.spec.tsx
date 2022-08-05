import { MoveModalContent } from 'modules/DetailsModal/components';
import { screen, render } from '@testing-library/react';
import { movesMock } from '__mocks__';

describe('MoveModalContent', () => {
  it('content should match the snapshot with passed first element of movesMock as a prop', () => {
    const { container } = render(<MoveModalContent selectedMove={movesMock[0]} />);
    expect(container).toMatchSnapshot();
  });
  it('data of the second element of movesMock should be rendered', () => {
    render(<MoveModalContent selectedMove={movesMock[1]} />);
    const { pp, power, accuracy, priority, type, learned_by_pokemon } = movesMock[1];
    expect(screen.getByText(learned_by_pokemon[0].name)).toBeInTheDocument();
    expect(screen.getByText(type.name)).toBeInTheDocument();
    expect(screen.getByText(accuracy)).toBeInTheDocument();
    expect(screen.getByText(priority)).toBeInTheDocument();
    expect(screen.getByText(power)).toBeInTheDocument();
    expect(screen.getByText(pp)).toBeInTheDocument();
  });
});
