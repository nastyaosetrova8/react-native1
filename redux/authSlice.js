import { createSlice } from '@reduxjs/toolkit';
import { authSignUpUser, authSignInUser, authSingOutUser } from './operations';
import { Alert } from 'react-native';

const initialState = {
  userId: null,
  nickname: null,
  stateChange: false,
  email: null,
  avatar: null,
};


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStateChanged: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      nickname: payload.nickname,
      email: payload.email,
      stateChange: true,
      avatar: payload.avatar,
    }),
  },
  extraReducers: builder =>
    builder
      .addCase(authSignUpUser.fulfilled, (state, { payload }) => {
        state.userId = payload.uid;
        state.nickname = payload.displayName;
        state.email = payload.mail;
        state.avatar = payload.photoURL;
      })
      .addCase(authSignUpUser.rejected, () => {
        Alert.alert('Wrong credentials');
      })
      .addCase(authSignInUser.fulfilled, () => {
        console.log('Welcome')
      })
      .addCase(authSignInUser.rejected, () => {
        Alert.alert('Wrong credentials');
      })
      .addCase(authSingOutUser.fulfilled, state => {
        state.userId = null;
        state.nickname = null;
        state.stateChange = false;
        state.email = null;
        state.avatar = null;
      }),
});

export const authReducer = authSlice.reducer;
export const onStateChange = authSlice.actions.authStateChanged;