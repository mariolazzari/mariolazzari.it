import GitHubCalendar from "react-github-calendar";

export function Calendar() {
  return (
    <GitHubCalendar
      username="mariolazzari"
      colorScheme="dark"
      blockRadius={50}
      weekStart={1}
      blockMargin={5}
      showWeekdayLabels
      year="last"
    />
  );
}
