import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AvailableTabs } from 'appConstants';
import { TabsState } from 'types';

export const initialState: TabsState = {
  activeTab: AvailableTabs.pokemons,
};

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    activeTabSync: (state, action: PayloadAction<AvailableTabs>) => {
      state.activeTab = action.payload;
    },
  },
});

const { actions, reducer } = tabsSlice;
export const { activeTabSync } = actions;
export default reducer;
