import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { portfolioSlice } from "./portfolioSlice";
import { createWrapper } from "next-redux-wrapper";
import { goalSlice } from "./goalSlice";
import { userSlice } from "./userSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      [portfolioSlice.name]: portfolioSlice.reducer,
      [goalSlice.name]: goalSlice.reducer,
      [userSlice.name]: userSlice.reducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
