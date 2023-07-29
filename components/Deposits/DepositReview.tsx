import { numberFormatter } from "@/helpers";
import { AppState } from "@/store/store";
import { Box, Center, Stepper, Text } from "@mantine/core";
import { useSelector } from "react-redux";

const DepositReview = ({
  depName,
  depAmount,
  allocations,
  savings,
}: {
  depName: string;
  depAmount: number;
  allocations: any;
  savings: number;
}) => {
  const goals = useSelector((state: AppState) => state.Goals.goals);

  const SingleGoal = (a: any) => {
    const goal: any = goals.find((i) => i._id === a);
    return (
      <Text>
        {goal?.name}: {numberFormatter(+allocations[a], "standard")}
      </Text>
    );
  };

  return (
    <Center sx={{ minHeight: "250px" }}>
      <Box sx={{ flex: "1 1" }}>
        <Box>
          <Text fw="bold" fz="lg">
            Deposit Name
          </Text>
          <Text>{depName}</Text>
        </Box>
        <Box mt="20px">
          <Text fw="bold" fz="lg">
            Amount
          </Text>
          <Text>${numberFormatter(depAmount, "standard")}</Text>
        </Box>
      </Box>
      <Box sx={{ flex: "1 1" }}>
        <Text fz="lg" fw="bold">
          Your Allocations
        </Text>
        {Object.keys(allocations).map((i) => SingleGoal(i))}
        <Text>Savings: {numberFormatter(+savings, "standard")}</Text>
      </Box>
    </Center>
  );
};

export default DepositReview;
