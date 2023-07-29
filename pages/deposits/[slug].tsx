import DefaultContainer from "@/components/common/DefaultContainer";
import { AppState } from "@/store/store";
import { Text } from "@mantine/core";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const SingleDeposit = () => {
  const router = useRouter();
  const { slug } = router.query;
  const deposit = useSelector((state: AppState) =>
    state.portfolio.deposits.find((i) => i.id === slug)
  );
  return (
    <DefaultContainer>
      <>
        <Text fz="3em" fw="bold">
          Deposit
        </Text>
        <Text mb="lg" opacity={0.7}>
          {deposit?.id}
        </Text>
        <Text>Name: {deposit?.name}</Text>
        <Text>Amount: ${deposit?.amount}</Text>
        <Text>
          Datetime: {new Date(`${deposit?.date}`).toLocaleDateString()}
        </Text>
      </>
    </DefaultContainer>
  );
};
export default SingleDeposit;
