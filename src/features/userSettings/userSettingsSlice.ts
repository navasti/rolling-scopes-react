import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AvailableTabs } from 'appConstants';
import { TabsState } from 'types';

export const initialState: TabsState = {
  activeTab: AvailableTabs.pokemons,
};

const userSettingsSlice = createSlice({
  name: 'userSettings',
  initialState,
  reducers: {
    activeTabSync: (state, action: PayloadAction<AvailableTabs>) => {
      state.activeTab = action.payload;
    },
  },
});

const { actions, reducer } = userSettingsSlice;
export const { activeTabSync } = actions;
export default reducer;
