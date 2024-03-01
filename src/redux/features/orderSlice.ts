import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { OrderInterface } from "../../views/ordersView/interface/order";

interface orderModel {
  currentOrder: OrderInterface;
  isActive?: boolean;
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
  isActive: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  // actions to change the state
  reducers: {
    onChangeCurrentOrder: (state, action: PayloadAction<orderModel>) => {
      state.currentOrder = action.payload.currentOrder;
    },
    onRemoveCurrentOrder: (state) => {
      state.currentOrder = { ...initialState.currentOrder };
    },
    setIsActiveTrue: (state) => {
      state.isActive = true;
    },
    setIsActiveFalse: (state) => {
      state.isActive = false;
    },
  },
});

export const {
  onChangeCurrentOrder,
  setIsActiveTrue,
  setIsActiveFalse,
  onRemoveCurrentOrder,
} = orderSlice.actions;
export default orderSlice.reducer;
