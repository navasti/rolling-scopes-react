import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import resourcesReducer from 'features/resources/resourcesSlice';
import tabsReducer from 'features/tabs/tabsSlice';
import formReducer from 'features/form/formSlice';

export const store = configureStore({
  reducer: {
    resources: resourcesReducer,
    form: formReducer,
    tabs: tabsReducer,
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
