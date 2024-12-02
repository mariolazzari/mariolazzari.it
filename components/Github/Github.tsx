"use client";

import { Calendar } from "./Calendar";
import { GithubProps } from "./GithubProps";
import { User } from "./User";

export function Github({ info, extra }: GithubProps) {
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <User info={info} extra={extra} />
      <Calendar username={info.login} />
    </div>
  );
}
