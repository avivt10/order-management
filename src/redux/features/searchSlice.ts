import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface searchModel {
  text: string;
}

const initialState: searchModel = {
  text: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState: initialState,
  // actions to change the state
  reducers: {
    onChangeSearch: (state, action: PayloadAction<searchModel>) => {
      state.text = action.payload.text;
    },
  },
});

export const { onChangeSearch } = searchSlice.actions;
export default searchSlice.reducer;
