import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomPokemon, FormState } from 'types';

const initialState: FormState = {
  customPokemons: [],
};

const customPokemonSlice = createSlice({
  name: 'customPokemon',
  initialState,
  reducers: {
    addCustomPokemon: (state, action: PayloadAction<CustomPokemon & { id: string }>) => {
      state.customPokemons.push(action.payload);
    },
  },
});

const { actions, reducer } = customPokemonSlice;

export const { addCustomPokemon } = actions;
export default reducer;
