import { getToday } from "@/actions/nasa";
import { Subtitle } from "@/components/Typography";
import { Picture } from "./Picture";

async function Apod() {
  const todayImg = await getToday();

  return (
    <div className="flex flex-col gap-8 items-center">
      <Subtitle text="Nasa astronomy picture of the day" />

      {todayImg.success && <Picture apod={todayImg.data} />}
    </div>
  );
}

export default Apod;
