import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { cryptoApi } from "../services/cryptoApi";
import { cryptoNewsApi } from "../services/cryptoNewsApi";
import { eventApi } from "../services/eventApi";
import userState from "../services/userState";
import darkThemeTrigger from "../services/darkThemeTrigger";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user", "darkTheme"],
};

const persistedReducer = persistReducer(persistConfig, userState);
const persistedThemeReducer = persistReducer(persistConfig, darkThemeTrigger);

export const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    darkTheme: persistedThemeReducer,
    user: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
