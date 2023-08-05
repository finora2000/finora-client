import {
  Alert,
  Avatar,
  BackgroundImage,
  Box,
  Center,
  Flex,
  Image,
  Notification,
  Text,
  Transition,
} from "@mantine/core";
import DefaultHeader from "@/components/common/DefaultHeader";
import SignUpModal from "@/components/signup/SignupModal";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [showNotification, setshowNotification] = useState(false);
  useEffect(() => {
    if (`${router.query?.status}` === "401") setshowNotification(true);
  }, [router]);
  return (
    <>
      <DefaultHeader />
      {showNotification && (
        <Box pos="absolute" top={5} right={5} w="max-content">
          <Notification
            title="Unauthorized Access!"
            withBorder
            withCloseButton
            color="red"
            onClose={() => setshowNotification(false)}
          >
            Please re-login to access your account!
          </Notification>
        </Box>
      )}
      <BackgroundImage
        src={"/istockphoto-1315105792-612x612.jpg"}
        h={"100vh"}
        w="100%"
        sx={{ objectFit: "cover" }}
      >
        <Center
          sx={{
            justifyContent: "space-between",
            padding: "0px 10px",
            height: "100%",
          }}
        >
          <Flex
            sx={{
              flexDirection: "column",
              width: "310px",
              wordWrap: "normal",
            }}
          >
            <Text fz="4em" color="white">
              Personal{" "}
              <span style={{ color: "green" }}>
                {/* <Text color="green" my="-15px"> */}
                {/* {" "} */}
                Finance {/* </Text> */}
              </span>
              Management
            </Text>
          </Flex>
          <Avatar
            // width={"80vh"}
            size="lg"
            w={"60vh"}
            h="60vh"
            sx={{ borderRadius: "100%" }}
            src="/happy-tiny-people-growing-money-tree-isolated-flat-illustration_74855-16162.avif"
          ></Avatar>
        </Center>
      </BackgroundImage>
    </>
  );
}
