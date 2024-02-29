import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  addOrderBtn: false,
};

const addOrderBtnSlice = createSlice({
  name: "addOrderBtn",
  initialState: initialState,
  // actions to change the state
  reducers: {
    setModeBtn: (state, action: PayloadAction<boolean>) => {
      state.addOrderBtn = action.payload;
    },
  },
});

export const { setModeBtn } = addOrderBtnSlice.actions;
export default addOrderBtnSlice.reducer;
