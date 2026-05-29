"use client";

import GitHubCalendar from "react-github-calendar";
import { CalendarProps } from "./CalendarProps";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";

export function Calendar({
  username = "mariolazzari",
  year = "last",
}: CalendarProps) {
  const locale = useLocale();
  const { theme } = useTheme();

  const enLabels = {
    months: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    weekdays: ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"],
    totalCount:
      year === "last"
        ? "{{count}} activities this year"
        : "{{count}} activities in {{year}}",
    legend: {
      less: "-",
      more: "+",
    },
  };
  const itLabels = {
    months: [
      "Gen",
      "Feb",
      "Mar",
      "Apr",
      "Mag",
      "Giu",
      "Lug",
      "Ago",
      "Set",
      "Ott",
      "Nov",
      "Dec",
    ],
    weekdays: ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
    totalCount:
      year === "last"
        ? "{{count}} contributi nell'ultimo anno"
        : "{{count}} contributi nel {{year}}",
    legend: {
      less: "-",
      more: "+",
    },
  };

  return (
    <div className="max-w-xs sm:max-w-sm  md:max-w-md lg:max-w-3xl xl:max-w-5xl bg-background p-4 rounded-xl shadow-xl">
      <GitHubCalendar
        username={username}
        year={year}
        blockRadius={50}
        weekStart={1}
        blockMargin={5}
        labels={locale === "it" ? itLabels : enLabels}
        showWeekdayLabels
        colorScheme={theme === "light" ? "light" : "dark"}
      />
    </div>
  );
}
