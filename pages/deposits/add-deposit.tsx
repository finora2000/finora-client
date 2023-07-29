import DepositAllocations from "@/components/Deposits/DepositAllocations";
import DepositDetails from "@/components/Deposits/DepositDetails";
import DepositReview from "@/components/Deposits/DepositReview";
import DefaultContainer from "@/components/common/DefaultContainer";
import { AxiosRequest } from "@/helpers";
import { goalsAction } from "@/store/goalSlice";
import { portfolioAction } from "@/store/portfolioSlice";
import {
  Box,
  Button,
  Center,
  Flex,
  Group,
  Input,
  Stepper,
  Tabs,
  Text,
  Timeline,
} from "@mantine/core";
import axios, { all } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Page = () => {
  const [active, setActive] = useState(0);
  const totalSteps = 3;

  const nextStep = () =>
    setActive((current) => (current < totalSteps ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const [depName, setDepName] = useState("");
  const [depAmount, setDepAmount] = useState(0);
  const [depAllocation, setDepAllocation] = useState(0);
  const [balance, setBalance] = useState(0);
  const [allocations, setAllocations] = useState<any>([]);
  const [savings, setSavings] = useState(0);
  const dispatch = useDispatch();
  const router = useRouter();

  const saveDeposit = async () => {
    const deposit = {
      name: depName,
      amount: depAmount,
      invested: depAllocation - savings,
      savings: savings,
      cash: depAmount - depAllocation,
    };
    console.log("allocations", allocations);
    const response = await new AxiosRequest("/deposits/new").post({
      ...deposit,
      allocations,
    });
    dispatch(
      portfolioAction.addDeposit({
        deposit: { ...response.data.deposit, ...deposit },
      })
    );
    dispatch(goalsAction.addDepositToGoal(allocations));
    router.push("/deposits");
  };

  return (
    <DefaultContainer>
      <>
        <Text fz="1.8em" fw="bold">
          Add Deposit
        </Text>
        <Stepper
          allowNextStepsSelect={false}
          px="lg"
          mt="30px"
          color="green"
          active={active}
          onStepClick={setActive}
          breakpoint="sm"
        >
          <Stepper.Step label="Step 1" description="Deposit Details">
            <DepositDetails
              depName={depName}
              depAmount={depAmount}
              depAllocation={depAllocation}
              setDepName={setDepName}
              setBalance={setBalance}
              setDepAllocation={setDepAllocation}
              setDepAmount={setDepAmount}
            />
          </Stepper.Step>
          <Stepper.Step label="Step 2" description="Allocate">
            <DepositAllocations
              balance={balance}
              setBalance={setBalance}
              allocations={allocations}
              setAllocations={setAllocations}
              depAllocation={depAllocation}
              savings={savings}
              setSavings={setSavings}
            />
          </Stepper.Step>
          <Stepper.Step label="Final step" description="Review">
            <DepositReview
              depName={depName}
              savings={savings}
              depAmount={depAmount}
              allocations={allocations}
            />
          </Stepper.Step>
        </Stepper>

        <Group position="center" mt="xl">
          <Button variant="default" disabled={active === 0} onClick={prevStep}>
            Back
          </Button>
          {active === 2 ? (
            <Button type="submit" onClick={saveDeposit} color="green">
              Save
            </Button>
          ) : (
            <Button onClick={nextStep} color="green">
              Next step
            </Button>
          )}
        </Group>
      </>
    </DefaultContainer>
  );
};

export default Page;
