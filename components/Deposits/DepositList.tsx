import { AppState } from "@/store/store";
import { Box, Table } from "@mantine/core";
import Link from "next/link";
import { useSelector } from "react-redux";

const DepositList = () => {
  const formatter = Intl.NumberFormat("en", {
    notation: "standard",
    unitDisplay: "long",
  });
  const deposits = useSelector((state: AppState) => state.portfolio.deposits);
  const rows = deposits.map((element) => (
    <tr>
      <td>{element.id}</td>
      <td>{element.name}</td>
      <td>{formatter.format(element.amount)}</td>
      <td>{new Date(element.date).toDateString()}</td>
    </tr>
  ));
  return (
    <Box sx={{ overflow: "auto" }}>
      <Table
        verticalSpacing="md"
        sx={{
          "@media (max-width: 980px)": {
            width: "100%",
            // overflow: "scroll",
          },
        }}
        horizontalSpacing="lg"
      >
        <thead>
          <tr>
            <th>Deposit Id</th>
            <th>Deposit Name</th>
            <th>Amout</th>
            <th>Deposited On</th>
            {/* <th></th> */}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Box>
  );
};

export default DepositList;
