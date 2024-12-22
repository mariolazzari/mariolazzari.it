import { Repository } from "@/types/github/Repository";
import { UserInfo } from "@/types/github/UserInfo";
import { UserInfoExtra } from "@/types/github/UserInfoExtra";

export type LastGithubActivitiesProps = {
  info: UserInfo;
  repos: Repository[];
  infoExtra: UserInfoExtra;
};
