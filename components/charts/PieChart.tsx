import { getRandomColor } from "@/helpers";
import React from "react";
import { Pie } from "react-chartjs-2";

export default function PieChart({
  style,
  labels = [],
  data = [],
  datasetLabel = "",
}: {
  style: React.CSSProperties;
  labels: string[];
  data: number[];
  datasetLabel: string;
}) {
  const showData = {
    labels,
    datasets: [
      {
        label: datasetLabel,
        data,
        backgroundColor: labels.map((i) => getRandomColor(i)),
      },
    ],
  };
  return <Pie style={style} data={showData} />;
}
