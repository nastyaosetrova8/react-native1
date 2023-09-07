import { createAsyncThunk } from '@reduxjs/toolkit';
import { auth } from '../firebase/config';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from 'firebase/auth';


export const authSignUpUser = createAsyncThunk(
  'auth/signUpUser',
  async ({ email, password, login, avatar }, thunkApi) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: login,
        photoURL: avatar,
      });
      const { uid, displayName, mail, photoURL } = auth.currentUser;
      return { uid, displayName, mail, photoURL };
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const authSignInUser = createAsyncThunk(
  'auth/signInUser',
  async ({ email, password }, thunkApi) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const authSingOutUser = createAsyncThunk(
  'auth/singOutUser',
  async (_, thunkApi) => {
    try {
      await signOut(auth);``
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);