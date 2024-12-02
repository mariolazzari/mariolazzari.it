import { Calendar } from "./Calendar";
import { LastGithubActivitiesProps } from "./LastGithubActivitiesProps";
import { User } from "./User";

export function LastGithubActivities({
  info,
  repos,
}: LastGithubActivitiesProps) {
  if (!info) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-8 my-8">
      <h3 className="font-semibold text-4xl">Il mio ultimo anno so Github</h3>
      <Calendar username="mariolazzari" year="last" />
      <User user={info} />
    </div>
  );
}
