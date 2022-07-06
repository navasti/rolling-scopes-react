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
    pokemons.forEach(async (pokemon) => {
      const data: PokemonDetails = await fetch(pokemon.url).then((res) => res.json());
      detailedPokemons.push(data);
    });
  } catch (error) {
    console.error(error);
  } finally {
    return detailedPokemons;
  }
};
