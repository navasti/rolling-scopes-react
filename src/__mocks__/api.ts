import { PokemonDetails, PokemonMove, PokemonType, Pokemon, Details } from 'types';
import { hasError } from 'utils';

export const fetchBaseMock = (mockData: Pokemon | PokemonMove | PokemonType) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve({ results: [mockData] }),
    })
  ) as jest.Mock;
};

export const fetchByParameterMock = (mockData: Details) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve(mockData),
    })
  ) as jest.Mock;
};

export const fetchDetailsMock = (mockData: Array<Details>) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      status: 200,
      json: () => Promise.resolve(mockData[0]),
    })
  ) as jest.Mock;
};

export const handleResponseMock = (status: number, mockData: Pokemon) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      status,
      json: () => Promise.resolve(hasError(status) ? undefined : mockData),
    })
  ) as jest.Mock;
};

export const handleMappedResponseMock = (status: number, mockData: PokemonDetails) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      status,
      json: () => Promise.resolve(hasError(status) ? undefined : mockData),
    })
  ) as jest.Mock;
};
