import { getRandomColor } from "@/helpers";
import { ChartData } from "chart.js";
import React from "react";
import { Bar } from "react-chartjs-2";

export default function BarChart({
  style,
  axis = "y",
  data,
  scales = {},
}: {
  style: React.CSSProperties;
  axis: "x" | "y";
  data: ChartData<"bar", number[], string>;
  scales?: {
    x?: {
      max: number; // Set the maximum value to 100
    };
    y?: {
      max: number; // Set the maximum value to 100
    };
  };
}) {
  const options = {
    indexAxis: `${axis}` as const,
    elements: {
      bar: {
        // borderWidth: 2,
      },
    },

    scales,
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "bottom" as const,
      },

      title: {
        display: false,
        text: "Chart.js Horizontal Bar Chart",
      },
    },
  };

  const labels = [
    "Retirement",
    "Car Downpayment",
    "House Downpayment",
    "Expensive Date",
    "Vacation",
  ];

  return (
    <>
      <Bar style={style} datasetIdKey="id" options={options} data={data} />
    </>
  );
}
