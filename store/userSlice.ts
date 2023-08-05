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
    news: [] as {
      title: string;
      link: string;
      source: string;
      pubDate: string;
    }[],
  },
  reducers: {
    setUserInfo: (state, payload) => {
      state.userInfo = payload.payload;
    },
    setNews: (state, payload) => {
      state.news = payload.payload;
    },
    logout: (state, payload) => {
      console.log("inside logout");
      localStorage.clear();
      window.location.href = "/";
    },
  },
});
export const userAction = userSlice.actions;
