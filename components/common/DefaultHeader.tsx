import { Box, Button, Flex, Header, Menu, Text } from "@mantine/core";
import SignUpModal from "../signup/SignupModal";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const DefaultHeader = () => {
  const [openModal, setOpenModal] = useState(false);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

  useEffect(() => {
    const localState = localStorage.getItem("applicationState") as any;
    if (!localState) return;
    const User = JSON.parse(localState);
    if (User.User._id) {
      setUserIsLoggedIn(true);
    }
  }, []);
  const router = useRouter();
  return (
    <>
      <SignUpModal isOpen={openModal} setIsOpen={() => setOpenModal(false)} />
      <Header height={60} p="xs">
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
            <Button color="green" onClick={() => setOpenModal(true)}>
              Register
            </Button>
          </Flex>
        </Flex>
      </Header>
    </>
  );
};

export default DefaultHeader;
