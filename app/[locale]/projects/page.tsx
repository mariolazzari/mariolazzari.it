import { getNpms } from "@/actions/npm";
import { LinkButton } from "@/components/LinkButton";
import { Npms } from "@/components/Npms/Npms";
import { PageProps } from "@/types/PageProps";
import { Year } from "@/types/Year";
import { getLocale } from "next-intl/server";

type Props = PageProps<void, { year: string }>;

async function ProjectsPage({ searchParams }: Props) {
  const year: Year = ((await searchParams).year as Year) ?? ("last" as Year);
  const resNpms = await getNpms();
  const locale = await getLocale();

  const renderButtons = (year: Year) => {
    let curr = new Date().getFullYear();
    const years: Year[] = ["last", curr];
    while (curr > 2018) {
      curr--;
      years.push(curr);
    }

    return years.map(y => (
      <LinkButton
        key={y}
        label={y.toString()}
        href={`/projects?year=${y}`}
        variant={year == y ? "default" : "outline"}
      />
    ));
  };

  return (
    <section className="flex flex-col items-center gap-8">
      <div className="flex justify-center items-center flex-wrap gap-2">
        {renderButtons(year)}
      </div>
      <Npms npms={resNpms.objects} year={year} locale={locale} />
    </section>
  );
}

export default ProjectsPage;
