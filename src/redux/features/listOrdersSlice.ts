import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { OrderInterface } from "../../views/ordersView/interface/order";

export interface listOrderModel {
  listOrders: OrderInterface[];
}

const initialState: listOrderModel = {
  listOrders: [],
};

const listOrderSlice = createSlice({
  name: "listOrders",
  initialState: initialState,
  // actions to change the state
  reducers: {
    setListOrders: (state, action: PayloadAction<listOrderModel>) => {
      state.listOrders = action.payload.listOrders;
    },
  },
});

export const { setListOrders } = listOrderSlice.actions;
export default listOrderSlice.reducer;
