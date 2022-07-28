import { MoveModalContent, PokemonModalContent, TypeModalContent } from 'modules';
import { render, screen } from '@testing-library/react';
import { appendComma, capitalize } from 'utils';
import {
  pokemonModalContentProperties,
  typeModalContentProperties,
  moveModalContentProperties,
  detailedPokemons,
  detailedMoves,
  detailedTypes,
} from '__mocks__';
import { NONE } from 'appConstants';

export const moveModalContentExpectations = () => {
  const { accuracy, learned_by_pokemon, power, priority, pp, type } = detailedMoves[0];
  moveModalContentProperties.forEach((item) =>
    expect(screen.getByText(`${item}:`)).toBeInTheDocument()
  );
  expect(screen.getByText(learned_by_pokemon[0].name)).toBeInTheDocument();
  expect(screen.getByText(String(accuracy))).toBeInTheDocument();
  expect(screen.getByText(String(priority))).toBeInTheDocument();
  expect(screen.getByText(String(power))).toBeInTheDocument();
  expect(screen.getByText(String(pp))).toBeInTheDocument();
  expect(screen.getByText(type.name)).toBeInTheDocument();
};

export const pokemonModalContentExpectations = () => {
  const { abilities, base_experience, height, weight, stats, types } = detailedPokemons[0];
  const renderedAbility = `${capitalize(abilities[0].ability.name)} - hidden: ${
    abilities[0].is_hidden ? 'yes' : 'no'
  }, slot: ${abilities[0].slot}`;
  const renderedStat = `${capitalize(stats[0].stat.name)} - power: ${stats[0].base_stat}, effort: ${
    stats[0].effort
  }`;
  pokemonModalContentProperties.forEach((item) =>
    expect(screen.getByText(`${item}:`)).toBeInTheDocument()
  );
  expect(screen.getByText(types[0].type.name)).toBeInTheDocument();
  expect(screen.getByText(String(base_experience))).toBeInTheDocument();
  expect(screen.getByText(renderedAbility)).toBeInTheDocument();
  expect(screen.getByText(String(height))).toBeInTheDocument();
  expect(screen.getByText(String(weight))).toBeInTheDocument();
  expect(screen.getByText(renderedStat)).toBeInTheDocument();
};

export const typeModalContentExpectations = () => {
  const { damage_relations, moves, pokemon } = detailedTypes[0];
  for (const i in damage_relations) {
    const key = i as keyof typeof damage_relations;
    const relation = damage_relations[key];
    const formatted =
      relation.length > 0 &&
      relation.map(({ name }, index) => appendComma(relation.length, index, name)).join('');
    if (formatted) {
      expect(screen.getByText(formatted)).toBeInTheDocument();
    }
  }
  expect(screen.getByText(moves[0].name)).toBeInTheDocument();
  expect(screen.getByText(pokemon[0].pokemon.name)).toBeInTheDocument();
  screen.getAllByText(NONE).forEach((element) => expect(element).toBeInTheDocument());
  typeModalContentProperties.forEach((item) =>
    expect(screen.getByText(`${item}:`)).toBeInTheDocument()
  );
};

describe('DetailsModal components', () => {
  it('PokemonModalContent', () => {
    render(<PokemonModalContent selectedPokemon={detailedPokemons[0]} />);
    pokemonModalContentExpectations();
  });
  it('MoveModalContent', () => {
    render(<MoveModalContent selectedMove={detailedMoves[0]} />);
    moveModalContentExpectations();
  });
  it('TypeModalContent', () => {
    render(<TypeModalContent selectedType={detailedTypes[0]} />);
    typeModalContentExpectations();
  });
});
