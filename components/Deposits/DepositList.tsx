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
      {/* <td style={{ width: "" }}>
        <Link href={"deposits/" + element.id}>
          <svg
            style={{ cursor: "pointer" }}
            xmlns="http://www.w3.org/2000/svg"
            // class="icon icon-tabler icon-tabler-external-link"
            width="24"
            height="24"
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
        </Link>
      </td> */}
    </tr>
  ));
  return (
    <>
      <Table verticalSpacing="md" horizontalSpacing="lg">
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
    </>
  );
};

export default DepositList;
