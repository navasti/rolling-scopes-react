import { render, screen } from '@testing-library/react';
import { pokemons } from './resources';
import { Card } from 'modules';

const cardExpectations = (pokemon, index = 0) => {
  const { sprites, abilities, stats, name } = pokemon;

  // Image
  const imgEl = screen.getAllByRole('img')[index];
  const imageWrapperEl = screen.getAllByTitle('image-wrapper')[index];
  expect(imgEl).toHaveAttribute('src', sprites.front_default);
  expect(imageWrapperEl).toContainElement(imgEl);
  expect(imgEl).toBeVisible();

  // Base information
  const baseEl = screen.getAllByTitle('base')[index];
  const baseTitleEl = screen.getAllByTitle('base-title')[index];
  const renderedName = `Name: ${name}`;
  const nameEl = screen.getByText(renderedName);
  expect(baseEl).toContainElement(baseTitleEl);
  expect(nameEl).toBeVisible();

  // Abilities
  const firstAbility = abilities[0];
  const abilitiesEl = screen.getAllByTitle('abilities')[index];
  const abilitiesTitleEl = screen.getAllByTitle('abilities-title')[index];
  const renderedAbility = `${firstAbility.ability.name.toUpperCase()}, hidden: ${
    firstAbility.is_hidden ? 'yes' : 'no'
  }, slot: ${firstAbility.slot}`;
  const abilityEl = screen.getByText(renderedAbility);
  expect(abilitiesEl).toContainElement(abilitiesTitleEl);
  expect(abilityEl).toBeVisible();

  // Stats
  const firstStat = stats[0];
  const statsEl = screen.getAllByTitle('stats')[index];
  const statsTitleEl = screen.getAllByTitle('stats-title')[index];
  const renderedStat = `${firstStat.stat.name.toUpperCase()}, power: ${
    firstStat.base_stat
  }, effort: ${firstStat.effort}`;
  const statEl = screen.getByText(renderedStat);
  expect(statsEl).toContainElement(statsTitleEl);
  expect(statEl).toBeVisible();
};

describe('Render all card components', () => {
  it('Card component', () => {
    const pokemon = pokemons[0];
    render(<Card pokemon={pokemon} />);
    cardExpectations(pokemon);
  });
});
