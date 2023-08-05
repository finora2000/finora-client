import { AppState } from "@/store/store";
import { Box, Center, Flex, Image, Table, Text } from "@mantine/core";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { Investment } from "@/store/goalSlice";

const StockInvestmentsTable = ({
  investments,
}: {
  investments: Investment[];
}) => {
  return (
    <Box style={{ flex: "1 1" }}>
      <Table>
        <thead>
          <tr>
            <th>S no.</th>
            <th>Ticker Name</th>
            <th>Total Change</th>
            <th>Allocation</th>
          </tr>
        </thead>
        <tbody>
          {investments
            .sort((a, b) => b.allocation - a.allocation)
            .map((a, idx) => (
              <tr key={"element.name"}>
                <td>{idx + 1}</td>
                <td>
                  <Flex align={"center"} gap="md">
                    {a.tickerLogo && (
                      <Image width={"20px"} src={a.tickerLogo} />
                    )}
                    <Text>{a.tickerName}</Text>
                  </Flex>
                </td>
                <td>{a.totalInterestGained.toFixed(2)}%</td>
                <td>{a.allocation}%</td>
              </tr>
            ))}
        </tbody>
      </Table>
      {!Object.entries(investments).length && (
        <Center fz="lg" fw="bold" py="30px" opacity={0.7}>
          <Flex direction={"column"} align={"center"}>
            <Image src="/empty-box.png" width="100px" height="auto" />
            <Text fz="lg">Not Enough Data</Text>
          </Flex>
        </Center>
      )}
    </Box>
  );
};

export default StockInvestmentsTable;
