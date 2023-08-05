import BarChart from "@/components/charts/BarChart";
import LineChart from "@/components/charts/LineChart";
import PieChart from "@/components/charts/PieChart";
import DefaultContainer from "@/components/common/DefaultContainer";
import { getRandomColor } from "@/helpers";
import { AppState } from "@/store/store";
import {
  AspectRatio,
  Box,
  Center,
  Divider,
  Flex,
  Image,
  Overlay,
  Text,
} from "@mantine/core";
import Link from "next/link";
import { useSelector } from "react-redux";

const Portfolio = () => {
  const investmentHistory = useSelector(
    (state: AppState) => state.portfolio.history || []
  );
  const goals = useSelector((state: AppState) => state.Goals.goals);

  const portfolioBalance = useSelector(
    (state: AppState) =>
      state.portfolio.balance || { cash: 0, savings: 0, invested: 0 }
  );

  const totalBalance = Object.values(portfolioBalance || {}).reduce(
    (curr, acc) => curr + acc,
    0
  );

  const news = useSelector((state: AppState) => state.User.news);

  const userInfo = useSelector((state: AppState) => state.User.userInfo);
  function getTimePassed(oldDate: string): string {
    const oldDateObj = new Date(oldDate);
    const currentDateObj = new Date();

    const timeDiffMs = currentDateObj.getTime() - oldDateObj.getTime();

    const seconds = Math.floor(timeDiffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return days === 1 ? `${days} day ago` : `${days} days ago`;
    } else if (hours > 0) {
      return hours === 1 ? `${hours} hour ago` : `${hours} hours ago`;
    } else if (minutes > 0) {
      return minutes === 1 ? `${minutes} minute ago` : `${minutes} minutes ago`;
    } else {
      return seconds === 1 ? `${seconds} second ago` : `${seconds} seconds ago`;
    }
  }

  return (
    <DefaultContainer>
      <>
        <Text fz="1.8em" fw="bold" mb="lg">
          Welcome Back, {userInfo.first_name}
        </Text>
        {/* <Text fz="1.5em">Your Portfolio</Text> */}
        <AspectRatio
          ratio={16 / 9}
          style={{ borderRadius: "10px", maxHeight: "300px" }}
        >
          {!investmentHistory.length && (
            <Overlay center opacity={0.6}>
              <Flex direction={"column"} align={"center"}>
                <Image src="/empty-box.png" width="100px" height="auto" />
                <Text color="white" fz="lg">
                  Not Enough Data
                </Text>
              </Flex>
            </Overlay>
          )}
          {/* @ts-ignore */}
          <LineChart
            data={{
              labels: investmentHistory.map((i) => i.month),
              datasets: [
                {
                  data: investmentHistory.map((i) => i.investedAmount),
                  label: "Investments",
                  backgroundColor: "green",
                  borderColor: "green",
                },
                {
                  data: investmentHistory.map((i) => i.cash),
                  label: "Cash",
                  backgroundColor: "gray",
                  borderColor: "gray",
                },
                {
                  data: investmentHistory.map((i) => i.savings),
                  label: "Savings",
                  backgroundColor: "orange",
                  borderColor: "orange",
                },
                {
                  data: investmentHistory.map((i) => i.investedReturn),
                  label: "Returns",
                  backgroundColor: "brown",
                  borderColor: "brown",
                },
              ],
            }}
            style={{
              padding: "10px",
              backgroundColor: "white",
              borderRadius: "10px",
              maxHeight: "300px",
            }}
          />
        </AspectRatio>
        <Flex
          mt={"lg"}
          gap={"lg"}
          align={"start"}
          sx={{
            "@media (max-width: 980px)": {
              flexDirection: "column-reverse",
            },
          }}
        >
          <Box
            p="lg"
            style={{ flex: "1 1", borderRadius: "10px" }}
            bg={"white"}
            sx={{
              "@media (max-width: 980px)": {
                width: "100%",
              },
            }}
          >
            <Text fw="bold" mb="lg" fz="lg">
              Latest News
            </Text>
            {news.map((n) => (
              <>
                <Divider my="md" orientation="horizontal" />
                <Flex align={"center"} gap={"md"}>
                  <Box>
                    <Text fz="md" fw="bold">
                      <Link href={n.link}>{n.title}</Link>
                    </Text>
                    <Text fz={"sm"} my="2px">
                      {n.source}
                    </Text>
                    <Text fz="xs" opacity={0.7}>
                      {getTimePassed(n.pubDate as any)}
                    </Text>
                  </Box>
                </Flex>
              </>
            ))}
          </Box>
          <Flex
            sx={{
              "@media (max-width: 980px)": {
                width: "100%",
              },
            }}
            gap="lg"
            direction={"column"}
            style={{ flex: "1 1" }}
          >
            <Box
              style={{
                flex: "1 1",
                padding: "20px 10px",
                backgroundColor: "white",
                height: "max-content",
                borderRadius: "10px",
              }}
            >
              <Text align="center" fw="bold" mb="lg" fz="lg">
                Goals Completed (%)
              </Text>
              <BarChart
                scales={{ x: { max: 100 } }}
                data={{
                  labels: goals.map((i) => i.name),
                  datasets: [
                    {
                      label: "",
                      data: goals.map((i) => (i.invested / i.target) * 100),
                      backgroundColor: goals.map((i) => getRandomColor(i.name)),
                    },
                  ],
                }}
                axis="y"
                style={{ maxHeight: "200px" }}
              />
            </Box>
            <Box
              style={{
                flex: "1 1",
                padding: "20px 10px",
                backgroundColor: "white",
                height: "max-content",
                borderRadius: "10px",
              }}
            >
              <Text align="center" fw="bold" mb="lg" fz="lg">
                Portfolio Balance (%)
              </Text>
              <BarChart
                data={{
                  labels: Object.keys(portfolioBalance),
                  datasets: [
                    {
                      label: "",
                      data: Object.values(portfolioBalance).map((i) =>
                        Math.round((i / totalBalance) * 100)
                      ),
                      backgroundColor: Object.keys(portfolioBalance).map((i) =>
                        getRandomColor(i)
                      ),
                    },
                  ],
                }}
                axis="x"
                scales={{ y: { max: 100 } }}
                style={{ maxHeight: "200px" }}
              />
            </Box>
          </Flex>
        </Flex>
      </>
    </DefaultContainer>
  );
};

export default Portfolio;
