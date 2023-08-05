import { AppShell, Navbar, Header } from "@mantine/core";
import DefaultNavbar from "./AppNavbar";
import DefaultHeader from "./AppHeader";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { AppState } from "@/store/store";
import { userAction } from "@/store/userSlice";
import LoadingScreen from "./LoadingScreen";
import { useRouter } from "next/router";
import { AxiosRequest } from "@/helpers";
import { goalsAction } from "@/store/goalSlice";
import { portfolioAction } from "@/store/portfolioSlice";
export default function DefaultContainer({
  children,
}: {
  children: React.ReactElement;
}) {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: AppState) => state.User.userInfo);
  const goals = useSelector((state: AppState) => state.Goals.goals);
  const portfolio = useSelector((state: AppState) => state.portfolio.balance);
  const [loading, setLoading] = useState(!userInfo._id);
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
      return;
    }
    (async () => {
      setLoading(true);
      if (
        !userInfo._id &&
        !goals.length &&
        (!portfolio.cash || !portfolio.invested || !portfolio.invested)
      ) {
        const response = await new AxiosRequest("/dashboard").get();
        console.log("response.data", response.data);
        if (response.data) {
          dispatch(userAction.setNews(response.data.news));
          dispatch(
            portfolioAction.setUserPortfolio({
              deposits: response.data.deposits,
              balance: response.data.portfolioDetails,
              history: response.data.portfolioHistory,
            })
          );
          dispatch(userAction.setUserInfo(response.data.user));
          dispatch(goalsAction.setGoals(response.data.goals));
        }
      }
      setLoading(false);
    })();
  }, []);
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <AppShell
          padding="md"
          navbar={<DefaultNavbar />}
          header={<DefaultHeader />}
          styles={(theme) => ({
            main: {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
              maxWidth: "100%",
              overflow: "hidden",
            },
          })}
        >
          {children}
        </AppShell>
      )}
    </>
  );
}
