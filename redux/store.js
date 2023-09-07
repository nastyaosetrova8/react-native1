// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// // import { authReducer, authSlice } from "./authSlice";
// import {
//   persistReducer,
//   persistStore,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { authReducer } from "./authSlice";
// // import rootReducer from "./rootReducer";

// const persistConfig = {
//   key: "auth",
//   storage: AsyncStorage,
// };
// // const rootReducer = combineReducers({
// //   [authSlice.name]: authSlice.reducer,
// // });

// // const reducer = persistReducer(persistConfig, rootReducer);
// const reducer = persistReducer(persistConfig, authReducer);

// export const store = configureStore({
//   reducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export const persistor = persistStore(store);

// // export default { store, persistor };

// =========================================================

import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
})

