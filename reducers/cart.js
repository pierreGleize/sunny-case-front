import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { isOpen: false, articles: [] },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    openCartModal: (state, action) => {
      state.value.isOpen = true;
    },

    closeCartModal: (state, action) => {
      state.value.isOpen = false;
    },

    addItem: (state, action) => {
      if (
        !state.value.articles.some(
          (article) => article._id === action.payload._id
        )
      ) {
        action.payload.quantity = 1;
        state.value.articles.push(action.payload);
      } else {
        const article = state.value.articles.find(
          (element) => element._id === action.payload._id
        );
        article.quantity += 1;
      }
    },
    removeOneItem: (state, action) => {
      const article = state.value.articles.find(
        (element) => element._id === action.payload
      );
      if (article) {
        if (article.quantity > 1) {
          article.quantity -= 1;
        } else {
          state.value.articles = state.value.articles.filter(
            (element) => element._id !== action.payload
          );
        }
      }
    },

    removeItem: (state, action) => {
      state.value.articles = state.value.articles.filter(
        (element) => element._id !== action.payload
      );
    },

    clearCart: (state, action) => {
      state.value = { isOpen: false, articles: [] };
    },
  },
});

export const {
  openCartModal,
  closeCartModal,
  addItem,
  removeItem,
  clearCart,
  removeOneItem,
} = cartSlice.actions;
export default cartSlice.reducer;
