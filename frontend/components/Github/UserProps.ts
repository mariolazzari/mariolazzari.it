import { UserInfo } from "@/types/github/UserInfo";
import { UserInfoExtra } from "@/types/github/UserInfoExtra";

export type UserProps = {
  info: UserInfo;
  extra: UserInfoExtra;
};
