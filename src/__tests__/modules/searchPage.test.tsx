import { fireEvent, render, screen } from '@testing-library/react';
import { detailedPokemons, localStorageMock } from '__mocks__';
import { Card, SearchBar, SearchPage } from 'modules';
import { BrowserRouter } from 'react-router-dom';
import { INPUT_VALUE_KEY } from 'appConstants';
import { PokemonDetails } from 'types';

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const cardExpectations = (pokemon: PokemonDetails) => {
  const { sprites, abilities, stats, name } = pokemon;
  // Image
  const imgEl = screen.getAllByRole('img')[0];
  expect(imgEl).toHaveAttribute('src', sprites.front_default);
  expect(imgEl).toBeVisible();
  // Base information
  const renderedName = `Name: ${name}`;
  const nameEl = screen.getByText(renderedName);
  expect(nameEl).toBeVisible();
  // Abilities
  const firstAbility = abilities[0];
  const renderedAbility = `${firstAbility.ability.name.toUpperCase()}, hidden: ${
    firstAbility.is_hidden ? 'yes' : 'no'
  }, slot: ${firstAbility.slot}`;
  const abilityEl = screen.getByText(renderedAbility);
  expect(abilityEl).toBeVisible();
  // Stats
  const firstStat = stats[0];
  const renderedStat = `${firstStat.stat.name.toUpperCase()}, power: ${
    firstStat.base_stat
  }, effort: ${firstStat.effort}`;
  const statEl = screen.getByText(renderedStat);
  expect(statEl).toBeVisible();
};

describe('Search page and related components', () => {
  it('LocalStorage input without saved value', () => {
    render(<SearchPage componentName="SearchPage" location="/" />, {
      wrapper: BrowserRouter,
    });
    const input = screen.getByPlaceholderText('Type here') as HTMLInputElement;
    expect(input.value).toEqual('');
    fireEvent.change(input, { target: { value: 'changed value' } });
    expect(input.value).toEqual('changed value');
    expect(window.localStorage.getItem(INPUT_VALUE_KEY)).toEqual('changed value');
  });

  it('LocalStorage input with saved value', () => {
    window.localStorage.setItem(INPUT_VALUE_KEY, 'testing input');
    render(<SearchPage componentName="SearchPage" location="/" />, {
      wrapper: BrowserRouter,
    });
    const input = screen.getByPlaceholderText('Type here');
    expect(input).toBeVisible();
  });

  it('SearchPage', () => {
    render(<SearchPage componentName="SearchPage" location="/" />, {
      wrapper: BrowserRouter,
    });
    expect(screen.getByLabelText(/Local Storage Input/)).toBeInTheDocument();
    expect(screen.getByText('SearchPage')).toBeInTheDocument();
  });
});

describe('SearchPage components', () => {
  it('Card', () => {
    const pokemon = detailedPokemons[0];
    render(<Card pokemon={pokemon} />);
    cardExpectations(pokemon);
  });

  it('SearchBar', () => {
    let inputValue = 'initial';
    render(
      <SearchBar
        label="test"
        inputValue={inputValue}
        onChange={(e) => (inputValue = e.target.value)}
      />
    );
    const input = screen.getByLabelText(/test/) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toEqual('initial');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(inputValue).toEqual('test');
  });
});
