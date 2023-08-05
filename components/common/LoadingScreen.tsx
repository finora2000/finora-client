import { Box, Center, Flex, Text } from "@mantine/core";
import Image from "next/image";
import { useState, useEffect } from "react";
const LoadingScreen = () => {
  const [activeDots, setActiveDots] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      if (activeDots >= 3) setActiveDots(0);
      else setActiveDots((i) => i + 1);
    }, 500);
  }, [activeDots]);
  return (
    <Center
      bg="#f8f9fa"
      sx={{
        alignItems: "center",
        alignContent: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      {/* <Image
        alt=""
        width={200}
        height={45}
        src="/logo-green.PNG"
        style={{ marginBottom: "20px" }}
      /> */}

      <Text fw="bold" fz="2.4rem" color="green">
        Finora
      </Text>
      <Flex gap="md" mt="sm">
        <Box
          p="5px"
          bg={activeDots >= 1 ? "green" : "white"}
          sx={{
            borderRadius: "100%",
            border: "1px solid green",
          }}
        ></Box>
        <Box
          p="5px"
          bg={activeDots >= 2 ? "green" : "white"}
          sx={{
            borderRadius: "100%",
            border: "1px solid green",
          }}
        ></Box>
        <Box
          bg={activeDots >= 3 ? "green" : "white"}
          p="5px"
          sx={{
            borderRadius: "100%",
            border: "1px solid green",
          }}
        ></Box>
      </Flex>
    </Center>
  );
};

export default LoadingScreen;
