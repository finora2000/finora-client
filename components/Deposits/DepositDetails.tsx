import { Box, Flex, Input, Stepper, Text } from "@mantine/core";
import { Dispatch, SetStateAction, useState } from "react";
const DepositDetails = ({
  setDepName,
  setDepAmount,
  setDepAllocation,
  depName,
  depAmount,
  depAllocation,
  setBalance,
}: {
  setDepName: Dispatch<SetStateAction<string>>;
  setDepAmount: Dispatch<SetStateAction<number>>;
  setDepAllocation: Dispatch<SetStateAction<number>>;
  setBalance: Dispatch<SetStateAction<number>>;
  depName: string;
  depAmount: number;
  depAllocation: number;
}) => {
  return (
    <Flex w="100%" sx={{ flexDirection: "column", minHeight: "250px" }}>
      <Box mt="20px">
        <Text>Deposit Name</Text>
        <Input
          onChange={(e) => setDepName(e.target.value)}
          name="name"
          placeholder="Deposit 1"
          w="400px"
          value={depName}
          type="text"
        />
      </Box>
      <Box mt="10px">
        <Text>Amount</Text>
        <Input
          onChange={(e) => setDepAmount(+e.target.value)}
          w="400px"
          name="amount"
          value={+depAmount}
          type="number"
          placeholder="10000"
        />
      </Box>
      <Box mt="10px">
        <Text>How much do you want to allocate?</Text>
        <Input
          w="400px"
          type="number"
          onChange={(e) => {
            setBalance(+e.target.value);
            setDepAllocation(+e.target.value);
          }}
          name="allocation"
          value={depAllocation}
          placeholder="1000"
        />
      </Box>
    </Flex>
  );
};

export default DepositDetails;
