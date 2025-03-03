import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage for persistence
import authReducer from "./slices/authSlice";
import googleAuthSlice from "./slices/googleAuthSlice";
import socialAuthReducer from "./slices/socialAuthSlice";

// Persist config for social authentication
const socialAuthPersistConfig = {
  key: "root",
  storage,
};

const persistedSocialAuthReducer = persistReducer(socialAuthPersistConfig, socialAuthReducer);

const store = configureStore({
  reducer: {
    auth: authReducer,
    googleAuth: googleAuthSlice,
    socialAuth: persistedSocialAuthReducer, // Use the persisted reducer
  },
});

export const persistor = persistStore(store);

export default store;
