"use client";

import dynamic from "next/dynamic";
import { AreaProps } from "./AreaProps";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function Area({ data }: AreaProps) {
  return (
    <div>
      <Chart
        options={{
          chart: {
            type: "area",
            zoom: {
              enabled: true,
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },
          xaxis: {
            type: "datetime",
          },
          yaxis: {
            opposite: false,
          },
          legend: {
            horizontalAlign: "left",
          },
        }}
        series={[
          {
            name: "Downloads",
            data,
          },
        ]}
        type="area"
        height={200}
        width="100%"
      />
    </div>
  );
}
