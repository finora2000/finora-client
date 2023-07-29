import BarChart from "@/components/charts/BarChart";
import DefaultContainer from "@/components/common/DefaultContainer";
import { AppState } from "@/store/store";
import { Flex, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const Page = () => {
  const router = useRouter();
  const singleGoal = useSelector((state: AppState) => state.Goals.goals).find(
    (i) => i._id === router.query.slug
  );
  return (
    <DefaultContainer>
      <>
        <Flex align={"start"} justify={"space-between"}>
          <Text fz="1.8em" fw="bold">
            {singleGoal?.name}
          </Text>
          {/* <BarChart
            style={{ maxHeight: "250px", maxWidth: "450px" }}
            axis="x"
          /> */}
        </Flex>
      </>
    </DefaultContainer>
  );
};

export default Page;
