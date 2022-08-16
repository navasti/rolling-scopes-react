import { fetchByParameterMock, fetchDetailsMock, fetchBaseMock } from '__mocks__/api';
import { pokemonsMock, baseData, movesMock, typesMock } from '__mocks__/data';
import {
  fetchPokemonByParameter,
  fetchMoveByParameter,
  fetchTypeByParameter,
  fetchPokemonDetails,
  fetchPokemonBase,
  fetchTypeBase,
  isServerError,
  fetchMoveBase,
  hasError,
} from 'utils';

describe('API utils', () => {
  it('should fetch base data', async () => {
    fetchBaseMock(baseData);
    const pokemons = await fetchPokemonBase('url');
    const moves = await fetchMoveBase('url');
    const types = await fetchTypeBase('url');
    expect(pokemons).toEqual([baseData]);
    expect(moves).toEqual([baseData]);
    expect(types).toEqual([baseData]);
  });
  it('should fetch pokemon by parameter', async () => {
    fetchByParameterMock(pokemonsMock[0]);
    const data = await fetchPokemonByParameter('url');
    expect(data).toEqual(pokemonsMock[0]);
  });
  it('should fetch move by parameter', async () => {
    fetchByParameterMock(movesMock[0]);
    const data = await fetchMoveByParameter('url');
    expect(data).toEqual(movesMock[0]);
  });
  it('should fetch type by parameter', async () => {
    fetchByParameterMock(typesMock[0]);
    const data = await fetchTypeByParameter('url');
    expect(data).toEqual(typesMock[0]);
  });
  it('should fetch detailed pokemons', async () => {
    fetchDetailsMock([pokemonsMock[0]]);
    const data = await fetchPokemonDetails([baseData]);
    expect(data).toEqual([pokemonsMock[0]]);
  });
  it('should fetch detailed moves', async () => {
    fetchDetailsMock([movesMock[0]]);
    const data = await fetchPokemonDetails([baseData]);
    expect(data).toEqual([movesMock[0]]);
  });
  it('should fetch detailed types', async () => {
    fetchDetailsMock([typesMock[0]]);
    const data = await fetchPokemonDetails([baseData]);
    expect(data).toEqual([typesMock[0]]);
  });
  it('should isServerError be truthy for 500 and falsy for 200', () => {
    expect(isServerError(200)).toBeFalsy();
    expect(isServerError(500)).toBeTruthy();
  });
  it('should hasError be truthy for 400 and falsy for 200', () => {
    expect(hasError(200)).toBeFalsy();
    expect(hasError(400)).toBeTruthy();
  });
});
