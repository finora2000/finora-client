import AddDeposit from "@/components/Deposits/AddDeposit";
import DepositList from "@/components/Deposits/DepositList";
import DefaultContainer from "@/components/common/DefaultContainer";
import { Box, Button, Flex, Table, Text } from "@mantine/core";
import { useId } from "@mantine/hooks";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/router";
const Page = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();
  return (
    <DefaultContainer>
      <>
        <AddDeposit opened={opened} close={close} />
        <Flex align="center" w="100%" justify="space-between" p="10px">
          <Text fz="1.8em" fw="bold">
            Your Past Deposits
          </Text>
          <Button
            color="green"
            onClick={() => router.push("/deposits/add-deposit")}
          >
            + Add Deposit
          </Button>
        </Flex>
        <DepositList />
      </>
    </DefaultContainer>
  );
};

export default Page;
