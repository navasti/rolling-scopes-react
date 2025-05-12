import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import resourcesReducer from 'features/resources/resourcesSlice';
import userSettingsReducer from 'features/userSettings/userSettingsSlice';
import customPokemonsReducer from 'features/customPokemon/customPokemonSlice';

export const store = configureStore({
  reducer: {
    resources: resourcesReducer,
    customPokemons: customPokemonsReducer,
    userSettings: userSettingsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
