import { numberFormatter } from "@/helpers";
import { AppState } from "@/store/store";
import { Box, Center, Flex, Image, Menu, Progress, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const GoalsList = ({}) => {
  const goals = useSelector((state: AppState) => state.Goals.goals);
  const router = useRouter();

  return (
    <>
      {!goals.length && (
        <Flex mt="100px" direction={"column"} align={"center"}>
          <Image src="/empty-box.png" width="150px" height="auto" />
          <Text fz="lg" opacity={0.6} fw="bold">
            Not Enough Data!
          </Text>
        </Flex>
      )}
      {goals.map((goal) => (
        <Flex
          sx={{
            border: "1px solid rgba(0,0,0,0.3)",
            padding: "15px 15px",
            background: "white",
            borderRadius: "10px",
            flexDirection: "column",
            margin: "20px 0px",
            width: "100%",
          }}
        >
          <Flex w="100%" justify={"space-between"} align={"center"}>
            <Flex
              gap="6px"
              align={"center"}
              onClick={() => router.push("/goals/" + goal._id)}
            >
              <Text
                fz="1.6em"
                sx={{
                  ":hover": {
                    cursor: "pointer",
                    textUnderlineOffset: "5px",
                    textUnderlinePosition: "auto",
                  },
                }}
              >
                {goal.name}
              </Text>
              <svg
                style={{ cursor: "pointer" }}
                xmlns="http://www.w3.org/2000/svg"
                // class="icon icon-tabler icon-tabler-external-link"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#2c3e50"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
                <path d="M11 13l9 -9" />
                <path d="M15 4h5v5" />
              </svg>
            </Flex>
          </Flex>
          <Progress
            value={Math.round((goal.invested / goal.target) * 100)}
            color="green"
            label={`${Math.round((goal.invested / goal.target) * 100)}%`}
            animate={Math.round(goal.invested / goal.target) * 100 !== 100}
            sx={{ margin: "10px 0px 4px 0px" }}
            size="xl"
          />
          {(goal.invested / goal.target) * 100 === 50 && (
            <Text mt="5px">You are halfway there! Good Work 👍</Text>
          )}
          {(goal.invested / goal.target) * 100 === 100 && (
            <Text mt="5px">Goal Completed 🎉🎊</Text>
          )}

          <Flex
            sx={{
              flexDirection: "column",
              flexWrap: "wrap",
              maxHeight: "200px",
              marginTop: "20px",
              width: "100%",
              overflowWrap: "break-word",
            }}
          >
            {[
              `Target: $${numberFormatter(goal.target)}`,
              `Invested: $${numberFormatter(goal.invested)}`,
              `Interest Gained: ${+goal.totalInterestGained.toFixed(2)}%`,
              `Day Change: ${+goal.dayChange.toFixed(2)}%`,
              `Todays' Gain: $${+goal.todaysGain.toFixed(2)}`,
            ].map((i) => (
              <Text
                sx={{
                  flex: "1 0 auto",
                  marginBottom: "10px",
                  opacity: 0.8,
                  // "@media (max-width: 980px)": {
                  //   width: "45%",
                  //   overflowWrap: "break-word",
                  // },
                  // textOverflow: "clip",
                }}
              >
                {i}
              </Text>
            ))}
            <Text
              sx={{
                flex: "1 0 auto",
                marginBottom: "10px",
                opacity: 0.8,
              }}
            >
              Start Date: {new Date(goal.startDate).toDateString()}
            </Text>
            <Text sx={{ flex: "1 0 auto", marginBottom: "10px", opacity: 0.8 }}>
              End Date:{" "}
              {goal.endDate ? (
                new Date(goal.endDate).toDateString()
              ) : (
                <i>In Progress</i>
              )}
            </Text>
          </Flex>
        </Flex>
      ))}
    </>
  );
};

export default GoalsList;
