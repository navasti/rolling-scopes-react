import { Pokemon, PokemonData, PokemonDetails } from 'types';

export const fetchPokemons = async (url: string) => {
  let pokemons: Array<Pokemon> = [];
  try {
    const data = await fetch(url);
    const { results }: PokemonData = await data.json();
    pokemons = [...results];
  } catch (error) {
    console.error(error);
  } finally {
    return pokemons;
  }
};

export const fetchDetailedPokemons = async (pokemons: Array<Pokemon>) => {
  let detailedPokemons: Array<PokemonDetails> = [];
  try {
    const responses = pokemons.map(async (pokemon) => {
      const response = await fetch(pokemon.url);
      return (await response.json()) as PokemonDetails;
    });
    detailedPokemons = await Promise.all(responses);
  } catch (error) {
    console.error(error);
  } finally {
    return detailedPokemons;
  }
};
