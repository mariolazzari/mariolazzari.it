"use client";

import { Calendar } from "./Calendar";
import { GithubProps } from "./GithubProps";
import { User } from "./User";

export function Github({ user, stars }: GithubProps) {
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <User user={user} stars={stars} />
      <Calendar username={user.login} />
    </div>
  );
}
