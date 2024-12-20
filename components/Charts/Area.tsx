"use client";

import dynamic from "next/dynamic";
import { AreaProps } from "./AreaProps";
import { useLocale } from "next-intl";
import it from "apexcharts/dist/locales/it.json";
import en from "apexcharts/dist/locales/en.json";
import { useTheme } from "next-themes";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function Area({
  series = [],
  height = 200,
  width = "100%",
  showLegend = true,
}: AreaProps) {
  const locale = useLocale();
  const { resolvedTheme } = useTheme();

  return (
    <Chart
      options={{
        chart: {
          type: "area",
          zoom: {
            enabled: true,
          },
          locales: [it, en],
          defaultLocale: locale,
          toolbar: {
            tools: {
              download: false,
            },
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
          show: showLegend,
          horizontalAlign: "left",
        },
        tooltip: {
          theme: resolvedTheme,
        },
      }}
      series={series}
      type="area"
      height={height}
      width={width}
    />
  );
}
