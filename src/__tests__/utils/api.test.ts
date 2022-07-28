import {
  fetchPokemonByParameter,
  handleMappedResponse,
  handleResponse,
  isServerError,
  fetchDetails,
  fetchBase,
  hasError,
} from 'utils';
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
  handleMappedResponseMock,
  fetchByParameterMock,
  handleResponseMock,
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
  it('handleResponse success', async () => {
    let error = false;
    window.alert = jest.fn(() => (error = true));
    handleResponseMock<Pokemon>(200, pokemon);
    const response = await fetch('url');
    const data = await handleResponse<Pokemon>(response);
    expect(data).toEqual(pokemon);
    expect(error).toBeFalsy();
  });
  it('handleResponse error', async () => {
    let error = false;
    window.alert = jest.fn(() => (error = true));
    handleResponseMock<Pokemon>(500, pokemon);
    const response = await fetch('url');
    const data = await handleResponse<Pokemon>(response);
    expect(data).toBeUndefined();
    expect(error).toBeTruthy();
  });
  it('handleMappedResponse success', async () => {
    let errorShown = 0;
    window.alert = jest.fn(() => (errorShown += 1));
    handleMappedResponseMock<PokemonDetails>(200, detailedPokemons[0]);
    const responses = [fetch('url')];
    const data = await handleMappedResponse<PokemonDetails>(responses);
    expect(data).toEqual([detailedPokemons[0]]);
    expect(errorShown).toEqual(0);
  });
  it('handleMappedResponse errors', async () => {
    let errorShown = 0;
    window.alert = jest.fn(() => (errorShown += 1));
    handleMappedResponseMock<PokemonDetails>(500, detailedPokemons[0]);
    const responses = ['url', 'url2'].map((url) => fetch(url));
    const data = await handleMappedResponse<PokemonDetails>(responses);
    expect(data).toEqual([]);
    expect(errorShown).toEqual(1);
  });
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
