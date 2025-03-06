import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage for persistence
import authReducer from "./slices/authSlice";
import googleAuthSlice from "./slices/googleAuthSlice";
import socialAuthReducer from "./slices/socialAuthSlice";
import emailReducer from "./slices/emailSlice";
import loginSlice from "./slices/loginSlice";
import resetPasswordSlice from "./slices/resetPasswordSlice";
// Persist config for social authentication
const socialAuthPersistConfig = {
  key: "root",
  storage,
  whitelist: ["userIds", "tokens", "isConnected"], // Only persist these fields
};

const persistedSocialAuthReducer = persistReducer(
  socialAuthPersistConfig,
  socialAuthReducer
);

const store = configureStore({
  reducer: {
    auth: authReducer,
    googleAuth: googleAuthSlice,
    socialAuth: persistedSocialAuthReducer,
    emails: emailReducer,
    login: loginSlice,
    resetPassword: resetPasswordSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        // Ignore these field paths in all actions
        ignoredActionPaths: ["payload.register", "payload.rehydrate"],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
