import { FaGithub } from "react-icons/fa6";
import { Calendar } from "./Calendar";
import { LastGithubActivitiesProps } from "./LastGithubActivitiesProps";
import { User } from "./User";
import { useTranslations } from "next-intl";
import { Subtitle } from "../Typography";
import { LinkButton } from "../LinkButton";
import { Repositories } from "./Repositories";

export function LastGithubActivities({
  info,
  infoExtra,
  repos,
}: LastGithubActivitiesProps) {
  const t = useTranslations("Home");

  if (!info) {
    return null;
  }

  return (
    <section className="flex flex-col items-center gap-8 my-8">
      <div className="flex flex-col items-center gap-2">
        <FaGithub size={64} />
        <Subtitle text={t("githubLastYear")} />
      </div>
      <Calendar username={info.login} year="last" />
      <User info={info} extra={infoExtra} />
      <Repositories title={t("lastActivities")} repos={repos} />
      <LinkButton href="/projects" label="Progetti" />
    </section>
  );
}
