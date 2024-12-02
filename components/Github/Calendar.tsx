import GitHubCalendar from "react-github-calendar";
import { CalendarProps } from "./CalendarProps";

export function Calendar({
  username = "mariolazzari",
  year = "last",
}: CalendarProps) {
  const labels = {
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
    weekdays: ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Don"],
    // totalCount: "",
    legend: {
      less: "-",
      more: "+",
    },
  };

  return (
    <div className="max-w-xs sm:max-w-md md:max-w-xl lg:max-w-4xl xl:max-w-6xl">
      <GitHubCalendar
        username={username}
        year={year}
        colorScheme="dark"
        blockRadius={50}
        weekStart={1}
        blockMargin={5}
        showWeekdayLabels
        labels={labels}
      />
    </div>
  );
}
