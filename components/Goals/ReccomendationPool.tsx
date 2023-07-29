import { Box, Flex, Text } from "@mantine/core";

const ReccomendationPool = () => {
  return (
    <Box
      p="10px 20px"
      mt="20px"
      sx={{
        backgroundColor: "white",
        outline: "2px solid rgb(0,0,0,0.14)",
        borderRadius: "10px",
        cursor: "pointer",
        ":hover": {
          transition: "ease 0.1s",
          outline: "2px solid rgba(64,192,87, 0.5)",
        },
      }}
    >
      <Text fw="bold">Pool 1</Text>
      <Flex
        sx={{
          flexDirection: "column",
          flexWrap: "wrap",
          maxHeight: "100px",
          // alignItems: "center",
          // justifyItems: "center",
          // marginTop: "20px",
          // padding: "10px",
        }}
      >
        <Text
          opacity={0.7}
          // sx={{ flex: "1 0 auto", marginBottom: "10px" }}
          fz="sm"
          mt="md"
        >
          AMZN: 30%
        </Text>
        <Text opacity={0.8} fz="sm" mt="md">
          MSFT: 25%
        </Text>
        <Text opacity={0.8} fz="sm" mt="md">
          TSLA: 25%
        </Text>
        <Text opacity={0.8} fz="sm" mt="md">
          GOOGL: 10%
        </Text>
        <Text opacity={0.8} fz="sm" mt="md">
          V: 10%
        </Text>
      </Flex>
    </Box>
  );
};

export default ReccomendationPool;
