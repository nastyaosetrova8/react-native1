import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCF9DOrJK91D64MD9sI5epe_hGEQXKFpIE",
  authDomain: "react-native1-69ab5.firebaseapp.com",
  databaseURL: '<https://react-native1-69ab5-default-rtdb.firebaseio.com>',
  projectId: "react-native1-69ab5",
  storageBucket: "react-native1-69ab5.appspot.com",
  messagingSenderId: "853340827201",
  appId: "1:853340827201:web:74bac5d03aecba2bbf20c0",
  measurementId: "G-6PFK5BE390",
};


export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const storage = getStorage(app);
export const db = getFirestore(app);


