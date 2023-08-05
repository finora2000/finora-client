import LineChart from "@/components/charts/LineChart";
import PieChart from "@/components/charts/PieChart";
import DefaultContainer from "@/components/common/DefaultContainer";
import StockInvestmentsTable from "@/components/investments/StockInvestmentsTable";
import { Investment } from "@/store/goalSlice";
import { AppState } from "@/store/store";
import {
  AspectRatio,
  Box,
  Center,
  Flex,
  Image,
  Overlay,
  Table,
  Text,
} from "@mantine/core";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const portfolioIvestments = useSelector(
    (state: AppState) => state.portfolio.investments
  );
  const investmentHistory = useSelector(
    (state: AppState) => state.portfolio.history
  );

  const goalInvestments = useSelector(
    (state: AppState) => state.Goals.goalInvestments
  );
  const investments = useMemo(() => {
    const invs: Investment[] = [];
    const totalInvested = goalInvestments.reduce((acc, curr) => {
      acc += curr.invested;
      return acc;
    }, 0);
    goalInvestments.map((inv) => {
      const stockExists = invs.findIndex((i) => i._id === inv._id);
      if (stockExists !== -1) {
        invs[stockExists] = {
          ...inv,
          allocation: Math.round((inv.invested / totalInvested) * 100),
          invested: inv.invested + invs[stockExists].invested,
        };
      } else {
        invs.push({
          ...inv,
          allocation: Math.round((inv.invested / totalInvested) * 100),
        });
      }
    });

    return invs;
  }, [goalInvestments]);
  return (
    <DefaultContainer>
      <>
        <Text fz="1.8em" fw="bold" mb="lg">
          Your Investments
        </Text>
        <AspectRatio
          ratio={16 / 9}
          maw={"100%"}
          sx={{ borderRadius: "10px", overflow: "clip" }}
          h={"300px"}
          mx="auto"
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
                  data: investmentHistory.map((i) => i.investedReturn),
                  label: "Returns",
                  backgroundColor: "brown",
                  borderColor: "brown",
                },
              ],
            }}
            style={{
              flex: "1 1",
              maxHeight: "300px",
              padding: "10px",
              backgroundColor: "white",
              borderRadius: "10px",
            }}
          />
        </AspectRatio>
        <Flex
          align={"start"}
          gap="lg"
          mt="lg"
          sx={{
            "@media (max-width: 980px)": {
              width: "100%",
              flexDirection: "column",
              marginTop: "-100px",
            },
          }}
        >
          <StockInvestmentsTable investments={investments} />
          <AspectRatio
            ratio={16 / 9}
            w={"100%"}
            sx={{ borderRadius: "10px", overflow: "clip", flex: "1 1" }}
            h={"auto"}
            mx="auto"
          >
            <Flex
              direction="column"
              style={{
                flex: "1 1",
                padding: "30px 0px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            >
              <Text
                style={{ textAlign: "center", marginBottom: "5px" }}
                fw="bold"
                fz="lg"
              >
                Capital Invested
              </Text>
              <PieChart
                labels={investments.map((i) => i.tickerName)}
                data={investments.map((i) => i.invested)}
                datasetLabel=""
                style={{}}
              />
              {!investments.length && (
                <Overlay center opacity={0.6}>
                  <Flex direction={"column"} align={"center"}>
                    <Image src="/empty-box.png" width="100px" height="auto" />
                    <Text color="white" fz="lg">
                      Not Enough Data
                    </Text>
                  </Flex>
                </Overlay>
              )}
            </Flex>
          </AspectRatio>
        </Flex>
      </>
    </DefaultContainer>
  );
};

export default Page;
