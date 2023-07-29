import { Box, Button, Center, Group, Input, Select, Text } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

const GoalDetails = ({
  name,
  setName,
  target,
  setTarget,
  priority,
  setPriority,
  duration,
  setDuration,
  nextStep,
  prevStep,
}: {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  target: number | "";
  setTarget: Dispatch<SetStateAction<number | "">>;
  priority: string;
  setPriority: Dispatch<SetStateAction<"High" | "Med" | "Low" | "">>;
  duration: string;
  setDuration: Dispatch<SetStateAction<"Long" | "Short" | "">>;
  nextStep: () => void;
  prevStep: () => void;
}) => {
  return (
    <>
      {" "}
      <Center
        sx={{ flexDirection: "column", alignItems: "start" }}
        //   w="30%"
        mt="lg"
      >
        <Box>
          <Text>Name</Text>
          <Input
            w="350px"
            value={name}
            onChange={(i) => setName(i.target.value)}
            type="text"
            placeholder="Retirement"
          />
        </Box>
        <Box mt="md">
          <Text>Target</Text>
          <Input
            w="350px"
            type="number"
            placeholder="20000"
            value={target}
            onChange={(i) => setTarget(+i.target.value)}
          />
        </Box>
        <Box mt="md">
          <Text>Priority</Text>
          <Select
            w="350px"
            // label="Priority"
            onChange={(i: any) => setPriority(i)}
            defaultValue={priority}
            placeholder="Add Priority"
            data={[
              { value: "High", label: "High" },
              { value: "Med", label: "Medium" },
              { value: "Low", label: "Low" },
            ]}
          />
        </Box>
        <Box mt="md">
          <Text>Duration</Text>
          <Select
            w="350px"
            defaultValue={duration}
            onChange={(i: any) => setDuration(i)}
            // label="Priority"
            placeholder="Add Duration"
            data={[
              { value: "Long", label: "Long Term (5-10 years)" },
              {
                value: "Short",
                label: "Short Term (0-2 years)",
              },
            ]}
          />
        </Box>
      </Center>
      <Group position="center" mt="xl">
        <Button variant="default" disabled onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep} color="green">
          Next step
        </Button>
      </Group>
    </>
  );
};

export default GoalDetails;
