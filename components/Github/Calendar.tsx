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
    totalCount: "",
  };

  return (
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
  );
}
