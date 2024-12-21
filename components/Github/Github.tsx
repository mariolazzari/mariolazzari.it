import { Subtitle } from "../Typography";
import { Calendar } from "./Calendar";
import { GithubProps } from "./GithubProps";
import { User } from "./User";
import { FaGithub } from "react-icons/fa";
import { getTranslations } from "next-intl/server";

export async function Github({ info, extra, year = "last" }: GithubProps) {
  const t = await getTranslations("Projects");

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <FaGithub size={64} />
      <Subtitle text={t("myGithub")} />
      <Calendar username={info.login} year={year} />
      <User info={info} extra={extra} />
    </div>
  );
}
