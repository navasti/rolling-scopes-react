import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomPokemon, FormState } from 'types';

const initialState: FormState = {
  customPokemons: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addCustomPokemon: (state, action: PayloadAction<CustomPokemon & { id: string }>) => {
      state.customPokemons.push(action.payload);
    },
  },
});

const { actions, reducer } = formSlice;

export const { addCustomPokemon } = actions;
export default reducer;
