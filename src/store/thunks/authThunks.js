import { createAsyncThunk } from '@reduxjs/toolkit';
import { authService } from '../../services/api';
import { loginSuccess, loginFailure } from '../slices/authSlice';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { dispatch }) => {
    try {
      const response = await authService.login(username, password);
      dispatch(loginSuccess(response));
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch(loginFailure(errorMessage));
      throw error;
    }
  }
);
