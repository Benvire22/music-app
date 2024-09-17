import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { GlobalError, LoginMutation, RegisterMutation, User, ValidationError } from '../../types';
import axiosApi from '../../axiosApi';
import { RootState } from '../../app/store';

export const register = createAsyncThunk<User, RegisterMutation, { rejectValue: ValidationError }>(
  'users/register',
  async (registerMutation, { rejectWithValue }) => {
    try {
      const { data: user } = await axiosApi.post<User>('/users', registerMutation);
      return user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  },
);

export const login = createAsyncThunk<User, LoginMutation, { rejectValue: GlobalError; state: RootState }>(
  'users/login',
  async (loginMutation, { rejectWithValue, getState }) => {
    try {
      const existingUser = getState().users.user;

      if (existingUser) {
        await axiosApi.post<User>('/users/sessions', loginMutation, {
          headers: { Authorization: `Bearer ${existingUser.token}` },
        });
      }

      const { data: user } = await axiosApi.post<User>('/users/sessions', loginMutation);
      return user;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }

      throw e;
    }
  },
);
