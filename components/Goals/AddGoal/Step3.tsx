import { numberFormatter } from "@/helpers";
import { Box, Button, Flex, Group, Text } from "@mantine/core";

const GoalReview = ({
  nextStep,
  prevStep,
  name,
  target,
  priority,
  duration,
  tickersAllocation,
  AddNewGoal,
}: {
  nextStep: () => void;
  prevStep: () => void;
  name: string;
  target: number | "";
  priority: string;
  duration: string;
  tickersAllocation: {};
  AddNewGoal: () => void;
}) => {
  return (
    <>
      <Flex gap={"md"} my="30px">
        <Box sx={{ flex: "1 1" }}>
          <Box>
            <Text fz="lg" fw={"bold"}>
              Goal Name
            </Text>
            <Text>{name}</Text>
          </Box>
          <Box>
            <Text fz="lg" fw={"bold"}>
              Target
            </Text>
            <Text>${numberFormatter(+target, "standard")}</Text>
          </Box>
          <Box>
            <Text fz="lg" fw={"bold"}>
              Priority
            </Text>
            <Text>{priority}</Text>
          </Box>
          <Box>
            <Text fz="lg" fw={"bold"}>
              Duration
            </Text>
            {duration === "Long" && <Text>Long Term (5-10 years)</Text>}
            {duration === "Short" && <Text>Short Term (0-2 years)</Text>}
          </Box>
        </Box>
        <Box sx={{ flex: "1 1" }}>
          <Box>
            <Text fz="lg" fw={"bold"}>
              Investments
            </Text>
            {Object.entries(tickersAllocation).map((t: any[]) => (
              <Text>
                {t[0]}: {t[1]}%
              </Text>
            ))}
          </Box>
        </Box>
      </Flex>
      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={AddNewGoal} color="green">
          Save
        </Button>
      </Group>
    </>
  );
};

export default GoalReview;
