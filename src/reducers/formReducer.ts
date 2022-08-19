import { FormAction, FormActionType, FormState } from 'types';

export const initialFormState: FormState = {
  customPokemons: [],
};

export const formReducer = (state: FormState, action: FormAction) => {
  const { payload, type } = action;
  switch (type) {
    case FormActionType.addPokemon:
      return {
        ...state,
        customPokemons: payload.customPokemons
          ? [...state.customPokemons, ...payload.customPokemons]
          : [...state.customPokemons],
      };
    default:
      return state;
  }
};
