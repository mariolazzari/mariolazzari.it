import GitHubCalendar from "react-github-calendar";
import { CalendarProps } from "./CalendarProps";
import { useLocale } from "next-intl";

export function Calendar({
  username = "mariolazzari",
  year = "last",
}: CalendarProps) {
  const locale = useLocale();

  const labels = {
    months:
      locale === "it"
        ? [
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
          ]
        : [
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
    weekdays:
      locale === "it"
        ? ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"]
        : ["Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"],
    legend: {
      less: "-",
      more: "+",
    },
  };

  return (
    <div className="max-w-xs sm:max-w-md md:max-w-xl lg:max-w-4xl xl:max-w-6xl bg-background p-4 rounded-xl shadow-xl">
      <GitHubCalendar
        username={username}
        year={year}
        blockRadius={50}
        weekStart={1}
        blockMargin={5}
        showWeekdayLabels
        labels={labels}
      />
    </div>
  );
}
