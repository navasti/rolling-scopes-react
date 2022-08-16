import { fetchPokemonByParameter, isServerError, fetchDetails, fetchBase, hasError } from 'utils';
import {
  PokemonMoveDetails,
  PokemonTypeDetails,
  PokemonDetails,
  PokemonMove,
  PokemonData,
  PokemonType,
  MovesData,
  TypesData,
  Pokemon,
} from 'types';
import {
  fetchByParameterMock,
  detailedPokemons,
  fetchDetailsMock,
  fetchBaseMock,
  detailedMoves,
  detailedTypes,
  pokemonMove,
  pokemonType,
  pokemon,
} from '__mocks__';

describe('API utils', () => {
  it('fetchBase pokemons', async () => {
    fetchBaseMock<Pokemon>(pokemon);
    const data = await fetchBase<PokemonData, Pokemon>('url');
    expect(data).toEqual([pokemon]);
  });
  it('fetchBase moves', async () => {
    fetchBaseMock<PokemonMove>(pokemonMove);
    const data = await fetchBase<MovesData, PokemonMove>('url');
    expect(data).toEqual([pokemonMove]);
  });
  it('fetchBase types', async () => {
    fetchBaseMock<PokemonType>(pokemonType);
    const data = await fetchBase<TypesData, PokemonType>('url');
    expect(data).toEqual([pokemonType]);
  });
  it('fetchPokemonByParameter pokemon', async () => {
    fetchByParameterMock<PokemonDetails>(detailedPokemons[0]);
    const data = await fetchPokemonByParameter<PokemonDetails>('url');
    expect(data).toEqual(detailedPokemons[0]);
  });
  it('fetchPokemonByParameter move', async () => {
    fetchByParameterMock<PokemonMoveDetails>(detailedMoves[0]);
    const data = await fetchPokemonByParameter<PokemonMoveDetails>('url');
    expect(data).toEqual(detailedMoves[0]);
  });
  it('fetchPokemonByParameter type', async () => {
    fetchByParameterMock<PokemonTypeDetails>(detailedTypes[0]);
    const data = await fetchPokemonByParameter<PokemonTypeDetails>('url');
    expect(data).toEqual(detailedTypes[0]);
  });
  it('fetchDetails pokemons', async () => {
    fetchDetailsMock<PokemonDetails>([detailedPokemons[0]]);
    const data = await fetchDetails<Pokemon, PokemonDetails>([pokemon]);
    expect(data).toEqual([detailedPokemons[0]]);
  });
  it('fetchDetails moves', async () => {
    fetchDetailsMock<PokemonMoveDetails>([detailedMoves[0]]);
    const data = await fetchDetails<PokemonMove, PokemonMoveDetails>([pokemonMove]);
    expect(data).toEqual([detailedMoves[0]]);
  });
  it('fetchDetails types', async () => {
    fetchDetailsMock<PokemonTypeDetails>([detailedTypes[0]]);
    const data = await fetchDetails<PokemonType, PokemonTypeDetails>([pokemonMove]);
    expect(data).toEqual([detailedTypes[0]]);
  });
  it('isServerError', () => {
    expect(isServerError(200)).toBeFalsy();
    expect(isServerError(500)).toBeTruthy();
  });
  it('hasError', () => {
    expect(hasError(200)).toBeFalsy();
    expect(hasError(400)).toBeTruthy();
  });
});
