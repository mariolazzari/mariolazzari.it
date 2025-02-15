import { getTodayApod } from "@/actions/nasa";
import { Subtitle } from "@/components/Typography";
import { Picture } from "./Picture";
import { Dates } from "@/components/Pickers";
import { startOfYesterday, subDays } from "date-fns";
import { PageProps } from "@/types/PageProps";

type ApodProps = PageProps<
  void,
  {
    start: string;
    end: string;
    random: string;
  }
>;

async function Apod(props: ApodProps) {
  // params
  const searchParams = await props.searchParams;
  const yesterday = startOfYesterday();
  const lastWeek = subDays(yesterday, 7);
  const from = searchParams.start ? new Date(searchParams.start) : lastWeek;
  const to = searchParams.end ? new Date(searchParams.end) : yesterday;
  const limit = searchParams.random ? +searchParams.random : 10;

  // load todat apod
  const todayImg = await getTodayApod();

  return (
    <div className="flex flex-col gap-8 items-center">
      <Subtitle text="Nasa astronomy picture of the day" />

      {todayImg.success && <Picture apod={todayImg.data} />}

      <Dates from={lastWeek} to={yesterday} />
    </div>
  );
}

export default Apod;
