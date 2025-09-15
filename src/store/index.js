import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import contractsReducer from './slices/contractsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contracts: contractsReducer,
    ui: uiReducer,
  },
});
