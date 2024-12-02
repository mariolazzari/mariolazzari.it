"use client";

import { Calendar } from "./Calendar";
import { GithubProps } from "./GithubProps";
import { User } from "./User";

export function Github({ user }: GithubProps) {
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <User user={user} />
      <Calendar username={user.login} />
    </div>
  );
}
