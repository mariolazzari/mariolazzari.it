import { FaGithub } from "react-icons/fa6";
import { Calendar } from "./Calendar";
import { LastGithubActivitiesProps } from "./LastGithubActivitiesProps";
import { User } from "./User";

export function LastGithubActivities({
  info,
  infoExtra,
  repos,
}: LastGithubActivitiesProps) {
  if (!info) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-8 my-8">
      <div className="flex flex-col items-center gap-2">
        <FaGithub size={64} />
        <h3 className="font-semibold text-4xl text-center">
          Il mio ultimo anno su Github
        </h3>
      </div>
      <Calendar username="mariolazzari" year="last" />
      <User info={info} extra={infoExtra} />

      {repos.length}
    </div>
  );
}
