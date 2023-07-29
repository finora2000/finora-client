import GoalDetails from "@/components/Goals/AddGoal/Step1";
import GoalAllocation from "@/components/Goals/AddGoal/Step2";
import GoalReview from "@/components/Goals/AddGoal/Step3";
import DefaultContainer from "@/components/common/DefaultContainer";
import { AxiosRequest } from "@/helpers";
import { goalsAction } from "@/store/goalSlice";
import {
  Autocomplete,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Group,
  Input,
  MultiSelect,
  Select,
  Stepper,
  Text,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Page = () => {
  const [active, setActive] = useState(0);
  const [name, setName] = useState<string>("");
  const [target, setTarget] = useState<number | "">("");
  const [priority, setPriority] = useState<"High" | "Med" | "Low" | "">("");
  const [duration, setDuration] = useState<"Long" | "Short" | "">("");
  const [chosenTickers, setChosenTickers] = useState<string[]>([]);
  const [tickersAllocation, setTickersAllocation] = useState([]);

  const totalSteps = 3;
  const dispatch = useDispatch();
  const nextStep = () =>
    setActive((current) => (current < totalSteps ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const router = useRouter();
  const AddNewGoal = async () => {
    const goalInfo = { name, target, priority, duration, tickersAllocation };
    const response = await new AxiosRequest("/goals/create").post(goalInfo);
    if (response.data) {
      dispatch(goalsAction.addGoal(response.data));
    }
    router.push("/goals");
  };

  return (
    <>
      <DefaultContainer>
        <>
          <Text fz="1.8em" fw="bold">
            Add New Goal
          </Text>
          <Stepper
            allowNextStepsSelect={false}
            px="lg"
            my="30px"
            color="green"
            active={active}
            onStepClick={setActive}
            breakpoint="sm"
          >
            <Stepper.Step label="Step 1" description="Goal Details">
              <GoalDetails
                name={name}
                setName={setName}
                target={target}
                setTarget={setTarget}
                priority={priority}
                setPriority={setPriority}
                duration={duration}
                setDuration={setDuration}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            </Stepper.Step>
            <Stepper.Step label="Step 2" description="Pick Your Investments">
              <GoalAllocation
                chosenTickers={chosenTickers}
                setChosenTickers={setChosenTickers}
                tickersAllocation={tickersAllocation}
                setTickersAllocation={setTickersAllocation}
                nextStep={nextStep}
                prevStep={prevStep}
              />
            </Stepper.Step>
            <Stepper.Step description="Review" label="Final Step">
              <GoalReview
                name={name}
                target={target}
                priority={priority}
                duration={duration}
                tickersAllocation={tickersAllocation}
                nextStep={nextStep}
                prevStep={prevStep}
                AddNewGoal={AddNewGoal}
              />
            </Stepper.Step>
          </Stepper>
        </>
      </DefaultContainer>
    </>
  );
};

export default Page;
