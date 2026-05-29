import { FaGithub } from "react-icons/fa6";
import { Calendar } from "./Calendar";
import { User } from "./User";
import { Subtitle } from "../Typography";
import { LinkButton } from "../LinkButton";
import { Repositories } from "./Repositories";
import { getUserInfo, getUserInfoExtra, getUserRepos } from "@/actions/github";
import { getTranslations } from "next-intl/server";

export async function LastGithubActivities() {
  // data fetching
  const info = await getUserInfo();
  if (!info) {
    return null;
  }

  const [repos, extra, t] = await Promise.all([
    getUserRepos({
      direction: "desc",
      page: 1,
      per_page: 6,
      username: "mariolazzari",
    }),
    getUserInfoExtra(info),
    getTranslations("Home"),
  ]);

  return (
    <section className="flex flex-col items-center gap-8 my-8">
      <div className="flex flex-col items-center gap-2">
        <FaGithub size={64} />
        <Subtitle text={t("githubLastYear")} />
      </div>
      <Calendar username={info.login} year="last" />
      <User info={info} extra={extra} />
      <Repositories title={t("lastActivities")} repos={repos} />
      <LinkButton href="/projects" label="Progetti" />
    </section>
  );
}
