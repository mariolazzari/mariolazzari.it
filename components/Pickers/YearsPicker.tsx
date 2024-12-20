"use client";

import { useState, useEffect, MouseEventHandler } from "react";
import { Year } from "@/types/Year";
import { Button } from "../ui/button";
import { YearsPickerProps } from "./YearsPickerProps";

export function YearsPicker({ onChange }: YearsPickerProps) {
  const [years, setYears] = useState<Year[]>([]);
  const [selected, setSelected] = useState<Year>("last");

  const onYearChange = (year: Year) => {
    setSelected(year);
    onChange(year);
  };

  useEffect(() => {
    let year = new Date().getFullYear();
    const years: Year[] = ["last", year];
    while (year > 2018) {
      year--;
      years.push(year);
    }
    setYears(years);
  }, []);

  return (
    <div className="flex justify-center items-center flex-wrap gap-4 px-2 py-2">
      {years.map(year => (
        <Button
          key={year}
          variant={year === selected ? "default" : "outline"}
          onClick={() => onYearChange(year)}
        >
          {year}
        </Button>
      ))}
    </div>
  );
}
