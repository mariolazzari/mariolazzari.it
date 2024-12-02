import { UserInfo } from "@/types/github/UserInfo";
import { UserInfoExtra } from "@/types/github/UserInfoExtra";

export type GithubProps = {
  info: UserInfo;
  extra: UserInfoExtra;
};
