type Size = number | string;

export type AreaProps = {
  series: ApexAxisChartSeries;
} & Partial<{
  width: Size;
  height: Size;
  showLegend: boolean;
}>;
