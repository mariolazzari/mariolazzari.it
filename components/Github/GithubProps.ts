import { UserInfo } from "@/types/github/UserInfo";
import { UserInfoExtra } from "@/types/github/UserInfoExtra";
import { Year } from "@/types/Year";

export type GithubProps = {
  info: UserInfo;
  extra: UserInfoExtra;
  year?: Year;
};
