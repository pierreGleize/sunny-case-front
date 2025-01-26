import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const orderHistorySlice = createSlice({
  name: "orderHistory",
  initialState,
  reducers: {
    addAnOrder: (state, action) => {
      state.value.push(action.payload);
    },
    addAllOrders: (state, action) => {
      for (let order of action.payload) {
        state.value.push(order);
      }
    },
    clearOrders: (state, action) => {
      state.value = [];
    },
  },
});

export const { addAnOrder, addAllOrders, clearOrders } =
  orderHistorySlice.actions;
export default orderHistorySlice.reducer;
