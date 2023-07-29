import { numberFormatter } from "@/helpers";
import { AppState } from "@/store/store";
import {
  Box,
  Flex,
  Input,
  NumberInput,
  Stepper,
  Tabs,
  Text,
} from "@mantine/core";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const DepositAllocations = ({
  balance,
  setBalance,
  allocations,
  setAllocations,
  depAllocation,
  savings,
  setSavings,
}: {
  balance: number;
  setBalance: any;
  allocations: any[];
  setAllocations: any;
  depAllocation: number;
  savings: number;
  setSavings: any;
}) => {
  const goals = useSelector((state: AppState) => state.Goals.goals);

  const SetNewAllocation = (goal: (typeof goals)[0], val: number) => {
    setAllocations((oldState: any) => {
      oldState[`${goal._id}`] = val;
      return oldState;
    });
    setBalance(
      () =>
        depAllocation -
        Object.values(allocations).reduce((acc, curr) => acc + curr, 0) -
        savings
    );
  };
  useEffect(() => {
    setAllocations(() => {
      const allGoals = goals.reduce((acc: any, o: any) => {
        acc[`${o._id}`] = 0;
        return acc;
      }, {});
      return allGoals;
    });
  }, []);
  return (
    <Flex
      pt="30px"
      w="100%"
      sx={{ flexDirection: "column", minHeight: "250px" }}
    >
      <Flex pl="md" pb="lg" gap="sm" align={"center"}>
        <Text fw="bold">Balance: {balance} </Text>
        <Text
          fz="0.7em"
          sx={{
            border: "1px solid #c2c2c2",
            borderRadius: "80px",
            width: "max-content",
            height: "max-height",
            padding: "2px 4px",
            background: "white",
            boxShadow: "0.5px 0.5px #a1a1a1",
            cursor: "pointer",
            ":active": {
              boxShadow: "0px 0px black",
            },
          }}
        >
          Auto-allocate
        </Text>
      </Flex>
      <Tabs
        color="green"
        defaultValue={goals.length ? goals[0].name : "Savings"}
        orientation="vertical"
      >
        <Tabs.List mr="20px">
          {goals.map((i) => (
            <Tabs.Tab
              disabled={i.target <= Math.max(i.invested, i.returns)}
              value={i.name}
            >
              {i.name}
            </Tabs.Tab>
          ))}
          <Tabs.Tab value={"Savings"}>Savings</Tabs.Tab>
        </Tabs.List>

        {goals.map((i) => (
          <Tabs.Panel value={i.name}>
            <Text>
              <span style={{ fontWeight: "bold" }}> Available to invest</span> -
              ${numberFormatter(i.target - i.invested, "standard")}
            </Text>
            <Text fw="bold" mt="sm">
              Amount
            </Text>
            <input
              type="number"
              max={balance}
              onChange={(event) => {
                const value = +event.currentTarget.value;
                const max = Math.min(balance, i.target - i.invested);

                if (value > max) {
                  // @ts-ignore
                  event.currentTarget.value = max;
                }
              }}
              onBlur={(e) => SetNewAllocation(i, +e.target.value)}
              // @ts-ignore
              defaultValue={allocations[`${i.id}`]}
              style={{
                width: "200px",
                padding: "6px 5px",
                marginTop: "4px",
                border: "1px solid rgba(0,0,0,0.23)",
                borderRadius: "5px",
              }}
            />
          </Tabs.Panel>
        ))}
        <Tabs.Panel value={"Savings"}>
          <Text>Amount</Text>
          {/* <NumberInput
            type="number"
            max={+balance}
            // @ts-ignore
            onBlur={(e) => {
              setSavings(+e.target.value);
              setBalance(
                () =>
                  depAllocation -
                  Object.values(allocations).reduce(
                    (acc, curr) => acc + curr,
                    0
                  ) -
                  +e.target.value
              );
            }}
            // @ts-ignore
            defaultValue={savings}
            w="200px"
          /> */}
          <input
            type="number"
            max={balance}
            onChange={(event) => {
              const value = +event.currentTarget.value;
              const max = balance;

              if (value > balance) {
                // @ts-ignore
                event.currentTarget.value = max;
              }
            }}
            onBlur={(e) => {
              setSavings(+e.target.value);
              setBalance(
                () =>
                  depAllocation -
                  Object.values(allocations).reduce(
                    (acc, curr) => acc + curr,
                    0
                  ) -
                  +e.target.value
              );
            }}
            // @ts-ignore
            defaultValue={savings}
            style={{
              width: "200px",
              padding: "6px 5px",
              marginTop: "4px",
              border: "1px solid rgba(0,0,0,0.23)",
              borderRadius: "5px",
            }}
          />
        </Tabs.Panel>
      </Tabs>
    </Flex>
  );
};

export default DepositAllocations;
