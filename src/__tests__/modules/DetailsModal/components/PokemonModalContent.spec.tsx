import { PokemonModalContent } from 'modules/DetailsModal/components';
import { screen, render } from '@testing-library/react';
import { pokemonsMock } from '__mocks__/data';
import { capitalize } from 'utils';

describe('PokemonModalContent', () => {
  it('content should match the snapshot with passed first element of pokemonsMock as a prop', () => {
    const { container } = render(<PokemonModalContent selectedPokemon={pokemonsMock[0]} />);
    expect(container).toMatchSnapshot();
  });
  it('data of the second element of pokemonsMock should be rendered', () => {
    render(<PokemonModalContent selectedPokemon={pokemonsMock[1]} />);
    const { weight, height, base_experience, types, stats, abilities } = pokemonsMock[1];
    const stat = `${capitalize(stats[0].stat.name)} - power: ${stats[0].base_stat}, effort: ${
      stats[0].effort
    }`;
    const ability = `${capitalize(abilities[0].ability.name)} - hidden: ${
      abilities[0].is_hidden ? 'yes' : 'no'
    }, slot: ${abilities[0].slot}`;
    expect(screen.getByText(types[0].type.name)).toBeInTheDocument();
    expect(screen.getByText(base_experience)).toBeInTheDocument();
    expect(screen.getByText(ability)).toBeInTheDocument();
    expect(screen.getByText(weight)).toBeInTheDocument();
    expect(screen.getByText(height)).toBeInTheDocument();
    expect(screen.getByText(stat)).toBeInTheDocument();
  });
});
