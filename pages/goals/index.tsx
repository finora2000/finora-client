import GoalsList from "@/components/Goals/GoalsList";
import DefaultContainer from "@/components/common/DefaultContainer";
import { Box, Button, Flex, Menu, Progress, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  return (
    <DefaultContainer>
      <>
        <Flex align={"center"} justify={"space-between"}>
          <Text fz="1.8em" fw="bold">
            Your Goals
          </Text>
          <Button color="green" onClick={() => router.push("/goals/add-goal")}>
            + Add New Goal
          </Button>
        </Flex>

        <GoalsList />
      </>
    </DefaultContainer>
  );
};

export default Page;
