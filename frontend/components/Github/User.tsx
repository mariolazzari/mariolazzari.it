import { Kpi, KpisProps } from "@/components/Charts";
import { UserProps } from "./UserProps";
import { Users, Eye, Star, GitFork, FolderGit } from "lucide-react";
import { useTranslations } from "next-intl";

export function User({ info, extra }: UserProps) {
  const { followers, following, public_repos } = info;
  const { stars, forks } = extra;

  const t = useTranslations("Github");

  const kpis: KpisProps[] = [
    {
      title: t("followers"),
      value: followers,
      icon: <Users />,
    },
    {
      title: t("following"),
      value: following,
      icon: <Eye />,
    },
    {
      title: t("projects"),
      value: public_repos,
      icon: <FolderGit />,
    },
    {
      title: t("stars"),
      value: stars,
      icon: <Star />,
    },
    {
      title: t("forks"),
      value: forks,
      icon: <GitFork />,
    },
  ];

  return (
    <div className="flex justify-center items-center flex-wrap gap-4">
      {kpis.map(kpi => (
        <Kpi key={kpi.title} {...kpi} />
      ))}
    </div>
  );
}
