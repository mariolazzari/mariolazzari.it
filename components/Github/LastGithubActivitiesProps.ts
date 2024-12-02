import { Repo } from "@/types/github/Repo";
import { UserInfo } from "@/types/github/UserInfo";

export type LastGithubActivitiesProps = {
  info: UserInfo;
  repos: Repo[];
  stars: number;
};
