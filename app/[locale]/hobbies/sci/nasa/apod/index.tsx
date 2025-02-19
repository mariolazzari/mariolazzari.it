import { getTodayApod } from "@/actions/nasa";
import { Subtitle } from "@/components/Typography";
import { Picture } from "./Picture";
import { Dates } from "@/components/Pickers";
import { startOfYesterday, subDays } from "date-fns";
// import { PageProps } from "@/types/PageProps";

// type ApodProps = PageProps<
//   void,
//   {
//     start: string;
//     end: string;
//     random: string;
//   }
// >;

async function Apod() {
  // query string parsing
  // const qs = await searchParams;
  const yesterday = startOfYesterday();
  const lastWeek = subDays(yesterday, 7);
  // const from = qs?.start ? new Date(qs.start) : lastWeek;
  // const to = qs?.end ? new Date(qs.end) : yesterday;
  // const limit = qs?.random ? +qs.random : 10;

  // load todat apod
  const todayImg = await getTodayApod();

  return (
    <div className="flex flex-col gap-8 items-center w-[350px] md:w-[400px] lg:w-[450px]">
      <Subtitle text="Nasa astronomy picture of the day" />

      {todayImg.success && <Picture apod={todayImg.data} />}

      <Dates from={lastWeek} to={yesterday} />
    </div>
  );
}

export default Apod;
