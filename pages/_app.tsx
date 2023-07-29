import { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { AppState, wrapper } from "@/store/store";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from "chart.js";
import { AxiosRequest } from "@/helpers";
import { useDispatch, useSelector } from "react-redux";
import { isDeepStrictEqual } from "util";
import { userAction } from "@/store/userSlice";
import { useEffect, useState } from "react";
import LoadingScreen from "@/components/common/LoadingScreen";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}

export default wrapper.withRedux(App);
