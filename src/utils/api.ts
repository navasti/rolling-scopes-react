import { Pokemon, PokemonData, PokemonDetails, PokemonType } from 'types';
import { API } from 'appConstants';

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

export const fetchPokemonByParameter = async <T>(url: string, param: string): Promise<T | null> => {
  let results: T | null = null;
  try {
    const response = await fetch(`${url}/${param}`);
    const data: T = await response.json();
    results = data;
  } catch (error) {
    console.error(error);
  } finally {
    return results;
  }
};

// export const fetch;

// pokemons, species, ability, type

// pokemon/charizard
// type || type/normal
// encounter-method
// ability/4 || ability/blaze
// move || move/tackle
