import { API_URL } from 'appConstants';
import { Pokemon, PokemonData, PokemonDetails } from 'types';

export const fetchPokemons = async (url: string) => {
  let pokemons: Array<Pokemon> = [];
  try {
    const { results }: PokemonData = await fetch(url).then((res) => res.json());
    pokemons = [...results];
  } catch (error) {
    console.error(error);
  } finally {
    return pokemons;
  }
};

export const fetchDetailedPokemons = async () => {
  const detailedPokemons: Array<PokemonDetails> = [];
  try {
    const pokemons = await fetchPokemons(API_URL);
    for (const pokemon of pokemons) {
      const response = await fetch(pokemon.url);
      const data: PokemonDetails = await response.json();
      detailedPokemons.push(data);
    }
  } catch (error) {
    console.error(error);
  } finally {
    return detailedPokemons;
  }
};
