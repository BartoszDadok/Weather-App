import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/api";
import locationReducer from "./state/locationSlice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    location: locationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store, RootState, AppDispatch };
