import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { OrderInterface } from "../../views/ordersView/interface/order";

interface orderModel {
  currentOrder: OrderInterface;
}

const initialState: orderModel = {
  currentOrder: {
    branch_id: 0,
    created_at: "",
    customer_id: 0,
    date: "",
    event_id: 0,
    id: 0,
    notes: "",
    num_of_guests: 0,
    order_type: "",
    prediction: false,
    recurrence: 0,
    status: "",
    time: "",
    updated_at: "",
    customer: "",
    source: "",
    branch: "",
  },
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  // actions to change the state
  reducers: {
    onChangeCurrentOrder: (state, action: PayloadAction<orderModel>) => {
      state.currentOrder = action.payload.currentOrder;
    },
  },
});

export const { onChangeCurrentOrder } = orderSlice.actions;
export default orderSlice.reducer;
