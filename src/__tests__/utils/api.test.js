import { fetchDetailedPokemons, fetchPokemons } from 'utils';
import { detailedPokemons, pokemons } from '__mocks__';
import { API_URL } from 'appConstants';

const pokemonMock = () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(pokemons),
    })
  );
};

const detailedPokemonsMock = () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(detailedPokemons),
    })
  );
};

describe('API calls', () => {
  let fetchedPokemons = [];
  it('Fetch pokemons', async () => {
    pokemonMock();
    const data = await fetchPokemons(API_URL);
    expect(data).toEqual(pokemons.results);
    fetchedPokemons = [...data];
  });
  it('Fetch detailed pokemons', async () => {
    detailedPokemonsMock();
    const data = await fetchDetailedPokemons(fetchedPokemons);
    expect(data[0]).toHaveLength(2);
    expect(data[0]).toEqual(detailedPokemons);
  });
});
