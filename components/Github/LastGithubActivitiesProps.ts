import { Repo } from "@/types/github/Repo";
import { UserInfo } from "@/types/github/UserInfo";
import { UserInfoExtra } from "@/types/github/UserInfoExtra";

export type LastGithubActivitiesProps = {
  info: UserInfo;
  repos: Repo[];
  infoExtra: UserInfoExtra;
};
