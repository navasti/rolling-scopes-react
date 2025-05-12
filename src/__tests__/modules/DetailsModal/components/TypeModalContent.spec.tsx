import { TypeModalContent } from 'modules/DetailsModal/components';
import { screen, render } from '@testing-library/react';
import { typesMock } from '__mocks__/data';

describe('TypeModalContent', () => {
  it('content should match the snapshot with passed first element of typesMock as a prop', () => {
    const { container } = render(<TypeModalContent selectedType={typesMock[0]} />);
    expect(container).toMatchSnapshot();
  });
  it('data of the second element of typesMock should be rendered', () => {
    render(<TypeModalContent selectedType={typesMock[1]} />);
    const { damage_relations, moves, pokemon } = typesMock[1];
    expect(screen.getByText(moves[0].name)).toBeInTheDocument();
    expect(screen.getByText(pokemon[0].pokemon.name)).toBeInTheDocument();
    for (const item in damage_relations) {
      const relations = damage_relations[item as keyof typeof damage_relations];
      relations.length === 1 && expect(screen.getByText(relations[0].name)).toBeInTheDocument();
      if (relations.length > 1) {
        const joined = relations.map((relation) => relation.name).join(', ');
        expect(screen.getByText(joined)).toBeInTheDocument();
      }
    }
  });
});
