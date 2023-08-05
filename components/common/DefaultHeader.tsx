import { Box, Button, Flex, Header, Menu, Text } from "@mantine/core";
import SignUpModal from "../signup/SignupModal";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const DefaultHeader = ({
  openModal,
  setOpenModal,
}: {
  openModal: boolean;
  setOpenModal: (state: boolean) => void;
}) => {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  useEffect(() => {
    const localState = localStorage.getItem("token") as any;
    if (!localState) return;
    setUserIsLoggedIn(true);
  }, []);
  const router = useRouter();
  return (
    <>
      <Header
        sx={{ boxShadow: "0px 1px 6px rgba(0,0,0,0.1)" }}
        fixed={true}
        zIndex={0}
        height={60}
        p="xs"
      >
        <Flex
          justify={"space-between"}
          w="100%"
          h="100%"
          px="10px"
          align="center"
        >
          <Box sx={{ cursor: "pointer" }}>
            {/* <Image alt="" width={180} height={90} src="/logo-black.PNG" /> */}
            <Image alt="" width={130} height={30} src="/logo-green.PNG" />
          </Box>
          <Flex gap="md" align={"center"}>
            {userIsLoggedIn && (
              <Button
                onClick={() => {
                  router.push("/portfolio");
                }}
                variant="outline"
                color="green"
              >
                Go To Dashboard
              </Button>
            )}
            <Button
              color="green"
              sx={{
                "@media (max-width: 40em)": {
                  display: userIsLoggedIn ? "none" : "block",
                },
              }}
              onClick={() => setOpenModal(true)}
            >
              Get Started
            </Button>
          </Flex>
        </Flex>
      </Header>
      <SignUpModal isOpen={openModal} setIsOpen={() => setOpenModal(false)} />
    </>
  );
};

export default DefaultHeader;
