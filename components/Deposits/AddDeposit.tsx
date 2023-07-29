import { portfolioAction } from "@/store/portfolioSlice";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  Input,
  Modal,
  Text,
  Title,
} from "@mantine/core";
import { FormEventHandler, useState } from "react";
import { useDispatch } from "react-redux";

const AddDeposit = ({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) => {
  const dispatch = useDispatch();

  const [addSavings, setAddSavings] = useState(false);
  const addDeposit = (e: any) => {
    e.preventDefault();
    const deposit = { name: e.target[0].value, amount: +e.target[1].value };
    dispatch(portfolioAction.addDeposit({ deposit }));
    close();
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={
          <Text fz="lg" fw="bold">
            Add Deposit
          </Text>
        }
        centered
      >
        <form onSubmit={addDeposit}>
          <Flex gap={"md"} mt="10px" direction="column">
            <Box>
              <Text>Name</Text>
              <Input
                name="Name"
                type="text"
                required
                mt="3px"
                placeholder="Monthly Salary"
              />
            </Box>
            <Box>
              <Text>Amount</Text>
              <Input
                required
                name="amount"
                sx={{
                  border: "1px solid rbga(0,0,0,0.25)",
                  borderRadius: "5px",
                }}
                mt="3px"
                type="number"
                placeholder="1000"
              />
            </Box>
            <Box>
              <Flex align={"center"} gap="10px">
                <Checkbox onChange={() => setAddSavings((e) => !e)} />
                <Text>Add Savings Amount</Text>
              </Flex>

              {addSavings && (
                <Input
                  pt="10px"
                  required
                  name="amount"
                  sx={{
                    border: "1px solid rbga(0,0,0,0.25)",
                    borderRadius: "5px",
                  }}
                  mt="3px"
                  type="number"
                  placeholder="200"
                />
              )}
            </Box>
            <Button type="submit" color="green" w="max-content">
              Submit
            </Button>
          </Flex>
        </form>
      </Modal>
    </>
  );
};

export default AddDeposit;
