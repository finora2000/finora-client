import {
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Input,
  MultiSelect,
  NumberInput,
  Text,
} from "@mantine/core";
import ReccomendationPool from "../ReccomendationPool";
import { useState, Dispatch, SetStateAction } from "react";

const GoalAllocation = ({
  nextStep,
  prevStep,
  chosenTickers,
  setChosenTickers,
  tickersAllocation,
  setTickersAllocation,
}: {
  nextStep: () => void;
  prevStep: () => void;
  chosenTickers: string[];
  setChosenTickers: Dispatch<SetStateAction<string[]>>;
  tickersAllocation: { ticker: number }[];
  setTickersAllocation: Dispatch<SetStateAction<never[]>>;
}) => {
  const updateTickerAllocation = (val = 0, ticker = "") => {
    setTickersAllocation((t) => {
      return { ...t, [`${ticker}`]: val };
    });
  };

  return (
    <>
      <Flex my="lg" style={{ padding: "10px 0px", minHeight: "350px" }}>
        <Box sx={{ flex: "1 1", marginRight: "30px" }}>
          <MultiSelect
            onChange={(i) => setChosenTickers(i)}
            label="Search your favorite Stocks/ETFs"
            placeholder="Pick one"
            searchable
            data={["AAPL", "MSFT", "V", "TSLA", "JNJ"]}
            nothingFound="Nothing found"
          />
          {chosenTickers.map((i: string) => (
            <Flex mt="lg" justify={"space-between"}>
              <Text>{i}</Text>
              <NumberInput
                width={"20px"}
                // @ts-ignore
                value={tickersAllocation[i]}
                onBlur={(b) => updateTickerAllocation(+b.target.value, i)}
                type="number"
                rightSection={<>%</>}
              />
            </Flex>
          ))}
        </Box>
        <Divider orientation="vertical" />
        <Box
          sx={{
            flex: "1 1",
            paddingLeft: "30px",
          }}
        >
          <Text fw="bold" fz="md" mb="lg">
            Recommendations
          </Text>
          <ReccomendationPool />
          <ReccomendationPool />
        </Box>
      </Flex>
      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep} color="green">
          Next step
        </Button>
      </Group>
    </>
  );
};

export default GoalAllocation;
