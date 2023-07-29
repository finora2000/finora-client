import { getRandomColor } from "@/helpers";
import { ChartData, ChartDataset, Point } from "chart.js";
import React from "react";

import { Line } from "react-chartjs-2";

export default function LineChart({
  style,
  data,
}: {
  style: React.CSSProperties;
  labels: string[];
  data: ChartData<"line", (number | Point | null)[], string>;
}) {
  return (
    <>
      <Line style={style} datasetIdKey="id" data={data} />
    </>
  );
}
