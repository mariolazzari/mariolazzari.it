import { getUserInfo, getUserInfoExtra, getUserRepos } from "@/actions/github";
import { getNpms } from "@/actions/npm";
import { Github } from "@/components/Github";
import { LinkButton } from "@/components/LinkButton";
import { Npms } from "@/components/Npms/Npms";
import { Subtitle } from "@/components/Typography";
import { PageProps } from "@/types/PageProps";
import { Year } from "@/types/Year";
import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

type Props = PageProps<void, { year: string }>;

async function ProjectsPage({ searchParams }: Props) {
  const { year = "last" } = await searchParams;

  // data fetching
  const githubUser = await getUserInfo();
  const [lastRepos, extra] = await Promise.all([
    getUserRepos({
      direction: "desc",
      page: 1,
      per_page: 5,
      username: "mariolazzari",
    }),
    getUserInfoExtra(githubUser),
  ]);

  const resNpms = await getNpms();
  const locale = await getLocale();
  const t = await getTranslations("Projects");

  const renderButtons = (year: string) => {
    let curr = new Date().getFullYear();
    const years: Year[] = ["last", curr];
    while (curr > 2018) {
      curr--;
      years.push(curr);
    }

    return (
      <div className="flex justify-center items-center flex-wrap gap-2">
        {years.map(y => (
          <LinkButton
            key={y}
            label={y.toString()}
            href={`/projects?year=${y}`}
            variant={year == y ? "default" : "outline"}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="flex flex-col items-center gap-8">
      <Subtitle text={t("title")} />
      {renderButtons(year)}
      <Github info={githubUser} extra={extra} year={year as Year} />
      <Npms npms={resNpms.objects} year={year as Year} locale={locale} />
    </section>
  );
}

export default ProjectsPage;
