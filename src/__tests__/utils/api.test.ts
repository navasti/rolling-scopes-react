import { fetchPokemonByParameter, isServerError, fetchDetails, fetchBase, hasError } from 'utils';
import {
  MockDetailedDataType,
  PokemonMoveDetails,
  PokemonTypeDetails,
  MockBaseDataType,
  PokemonDetails,
  PokemonMove,
  PokemonData,
  PokemonType,
  MovesData,
  TypesData,
  Pokemon,
} from 'types';
import {
  detailedPokemons,
  detailedMoves,
  detailedTypes,
  pokemonMoves,
  pokemonTypes,
  pokemons,
} from '__mocks__';

const fetchBaseMock = <T extends MockBaseDataType>(mockData: T) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve({ results: [mockData] }),
    })
  ) as jest.Mock;
};

const fetchByParameterMock = <T extends MockDetailedDataType>(mockData: T) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve(mockData),
    })
  ) as jest.Mock;
};

const fetchDetailsMock = <T>(mockData: Array<T>) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve(mockData[0]),
    })
  ) as jest.Mock;
};

describe('API utils', () => {
  it('fetchBase pokemons', async () => {
    fetchBaseMock<Pokemon>(pokemons);
    const data = await fetchBase<PokemonData, Pokemon>('url');
    expect(data).toEqual([pokemons]);
  });
  it('fetchBase moves', async () => {
    fetchBaseMock<PokemonMove>(pokemonMoves);
    const data = await fetchBase<MovesData, PokemonMove>('url');
    expect(data).toEqual([pokemonMoves]);
  });
  it('fetchBase types', async () => {
    fetchBaseMock<PokemonType>(pokemonTypes);
    const data = await fetchBase<TypesData, PokemonType>('url');
    expect(data).toEqual([pokemonTypes]);
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
    const data = await fetchDetails<Pokemon, PokemonDetails>([pokemons]);
    expect(data).toEqual([detailedPokemons[0]]);
  });
  it('fetchDetails moves', async () => {
    fetchDetailsMock<PokemonMoveDetails>([detailedMoves[0]]);
    const data = await fetchDetails<PokemonMove, PokemonMoveDetails>([pokemonMoves]);
    expect(data).toEqual([detailedMoves[0]]);
  });
  it('fetchDetails types', async () => {
    fetchDetailsMock<PokemonTypeDetails>([detailedTypes[0]]);
    const data = await fetchDetails<PokemonType, PokemonTypeDetails>([pokemonMoves]);
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
