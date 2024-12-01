import GitHubCalendar from "react-github-calendar";
import { CalendarProps } from "./CalendarProps";

export function Calendar({
  username = "mariolazzari",
  year = "last",
}: CalendarProps) {
  return (
    <GitHubCalendar
      username={username}
      year={year}
      colorScheme="dark"
      blockRadius={50}
      weekStart={1}
      blockMargin={5}
      showWeekdayLabels
    />
  );
}
