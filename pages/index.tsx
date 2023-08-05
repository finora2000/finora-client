import {
  Alert,
  Avatar,
  BackgroundImage,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Notification,
  Text,
  Transition,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import DefaultHeader from "@/components/common/DefaultHeader";
import SignUpModal from "@/components/signup/SignupModal";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

export default function Home() {
  const router = useRouter();
  const [showNotification, setshowNotification] = useState(false);
  useEffect(() => {
    if (`${router.query?.status}` === "401") setshowNotification(true);
  }, [router]);
  const autoplay = useRef(Autoplay({ delay: 2000 }));
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <DefaultHeader openModal={openModal} setOpenModal={setOpenModal} />
      {showNotification && (
        <Box
          pos="absolute"
          sx={{ zIndex: 99999 }}
          top={5}
          right={5}
          w="max-content"
        >
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
      <Center
        sx={{
          justifyContent: "space-between",
          height: "100vh",
          padding: "0 10vh",
          width: "100%",
          "@media (max-width: 40em)": {
            padding: "10vh 0vh 0vh 0vh",
            flexDirection: "column",
            justifyContent: "center",
          },
        }}
        bg="#f8f9fa"
      >
        <Flex
          sx={{
            flexDirection: "column",
            width: "50%",
            "@media (max-width: 40em)": {
              width: "90%",
            },
            wordWrap: "normal",
          }}
          gap={"lg"}
        >
          <Text
            fz="3.1em"
            sx={{
              "@media (max-width: 40em)": {
                fontSize: "1.8em",
                width: "100%",
              },
            }}
            fw="bold"
            color="black"
          >
            Master Your Money: Empower Your{" "}
            <span style={{ color: "green" }}>
              {/* <Text color="green" my="-15px"> */}
              {/* {" "} */}
              Finances {/* </Text> */}
            </span>
          </Text>
          <Text
            opacity={0.8}
            fz="md"
            sx={{
              "@media (max-width: 40em)": {
                fontSize: "0.9em",
              },
            }}
          >
            Unlock financial freedom with our intuitive personal finance
            software designed to optimize your wealth and achieve your goals.
          </Text>
          <Button
            onClick={() => setOpenModal(true)}
            w="max-content"
            color="green"
          >
            Register
          </Button>
        </Flex>
        <Avatar
          // width={"80vh"}
          size="lg"
          w={"60vh"}
          h="60vh"
          sx={{
            borderRadius: "100%",
            "@media (max-width: 40em)": {
              width: "40vh",
              height: "40vh",
            },
          }}
          src="/spreadsheet-computer-flat-icon-financial-accounting-report-concept-vector-illustration-png_282588.PNG"
        ></Avatar>
      </Center>
    </>
  );
}
