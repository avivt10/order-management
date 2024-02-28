import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface cityModel {
 
}

const initialState: cityModel = {

};

const citySlice = createSlice({
  name: "city",
  initialState: initialState,

  // actions to change the state
  reducers: {
    // 
    onChangeCurrentCity: (state, action: PayloadAction<cityModel>) => {
      state.currentCity = action.payload.currentCity;
    },
  },
});

export const { onChangeCurrentCity } = citySlice.actions;
export default citySlice.reducer;
