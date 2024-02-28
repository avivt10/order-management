import { configureStore } from "@reduxjs/toolkit";
import orderSlice from "./features/orderSlice";
import listOrdersSlice from "./features/listOrdersSlice";
import addOrderBtnSlice from "./features/addOrderBtnSlice";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    orderSlice: orderSlice,
    listOrdersSlice: listOrdersSlice,
    addOrderBtnSlice: addOrderBtnSlice,
  },
});
