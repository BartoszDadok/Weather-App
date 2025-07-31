import { LocationCoordinates } from "@/app/hooks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type LocationState = {
  location: LocationCoordinates | null;
};

const initialState: LocationState = {
  location: null,
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    addLocation: (
      state: LocationState,
      action: PayloadAction<LocationCoordinates>
    ) => {
      state.location = action.payload;
    },
  },
});

export const { addLocation } = locationSlice.actions;

export default locationSlice.reducer;
