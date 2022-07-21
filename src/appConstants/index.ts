// export const API_URL = 'https://pokeapi.co/api/v2/pokemon?limit=50&offset=0';
export const INPUT_VALUE_KEY = 'input-value';

export const API = (() => {
  const BASE = 'https://pokeapi.co/api/v2';
  return {
    POKEMONS: `${BASE}/pokemon?limit=50&offset=0`,
    NAME: `${BASE}/pokemon`,
    TYPE: `${BASE}/type`,
    MOVE: `${BASE}/move`,
    BASE,
  };
})();
