import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { email: null, token: null, address: {} },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.email = action.payload.email;
      state.value.address = action.payload.address;
    },
    addAddress: (state, action) => {
      state.value.address = action.payload;
    },
    logout: (state, action) => {
      state.value = { email: null, token: null, address: {} };
    },
  },
});

export const { login, addAddress, logout } = userSlice.actions;
export default userSlice.reducer;
