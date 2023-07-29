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

  const userInfo = useSelector((state: AppState) => state.User.userInfo);

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
        <Flex mt={"lg"} gap={"lg"} align={"start"}>
          <Box
            p="lg"
            style={{ flex: "1 1", borderRadius: "10px" }}
            bg={"white"}
          >
            <Text fw="bold" mb="lg" fz="lg">
              Latest News
            </Text>
            {[1, 1, 2].map(() => (
              <>
                <Divider my="md" orientation="horizontal" />
                <Flex align={"center"} gap={"md"}>
                  <Image
                    src="https://media.istockphoto.com/id/1369150014/vector/breaking-news-with-world-map-background-vector.jpg?s=612x612&w=0&k=20&c=9pR2-nDBhb7cOvvZU_VdgkMmPJXrBQ4rB1AkTXxRIKM="
                    style={{ maxWidth: "150px" }}
                  />
                  <Box>
                    <Text fz="lg">News Headlines</Text>
                    <Text fz={"sm"} my="2px">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Consequatur quaerat quae expedita ipsam nisi...
                    </Text>
                    <Text fz="xs" opacity={0.7}>
                      4 mins ago
                    </Text>
                  </Box>
                </Flex>
              </>
            ))}
          </Box>
          <Flex gap="lg" direction={"column"} style={{ flex: "1 1" }}>
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
