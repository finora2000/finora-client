import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "User",
  initialState: {
    userInfo: {
      _id: "",
      email: "",
      last_name: "",
      first_name: "",
    },
  },
  reducers: {
    setUserInfo: (state, payload) => {
      state.userInfo = payload.payload;
    },
    logout: (state, payload) => {
      console.log("inside logout");
      localStorage.clear();
      window.location.href = "/";
    },
  },
});
export const userAction = userSlice.actions;
