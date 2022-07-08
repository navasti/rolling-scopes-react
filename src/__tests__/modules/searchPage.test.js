import { fireEvent, render, screen } from '@testing-library/react';
import { Card, SearchBar, SearchPage } from 'modules';
import { pokemons, localStorageMock } from 'utils';
import { BrowserRouter } from 'react-router-dom';
import { INPUT_VALUE_KEY } from 'appConstants';

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

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

describe('Search page and related components', () => {
  it('LocalStorage input without saved value', () => {
    render(<SearchPage componentName="SearchPage" location="/" />, {
      wrapper: BrowserRouter,
    });
    const input = screen.getByTitle('local-storage-input');
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
    const input = screen.getByTitle('local-storage-input');
    expect(input.value).toEqual('testing input');
  });

  it('SearchPage', () => {
    render(<SearchPage componentName="SearchPage" location="/" />, {
      wrapper: BrowserRouter,
    });
    expect(screen.getByTitle('search-bar')).toBeInTheDocument();
    expect(screen.getByText('SearchPage')).toBeInTheDocument();
    expect(screen.getByTitle('cards')).toBeInTheDocument();
  });
});

describe('SearchPage components', () => {
  it('Card', () => {
    const pokemon = pokemons[0];
    render(<Card pokemon={pokemon} />);
    cardExpectations(pokemon);
  });

  it('SearchBar', () => {
    let inputValue = '';
    render(
      <SearchBar
        label="test"
        inputValue={inputValue}
        onChange={(e) => (inputValue = e.target.value)}
      />
    );
    const label = screen.getByTitle('local-storage-label');
    const input = screen.getByTitle('local-storage-input');
    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(label.textContent).toEqual('test');
    expect(input.value).toEqual('');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(inputValue).toEqual('test');
  });
});
