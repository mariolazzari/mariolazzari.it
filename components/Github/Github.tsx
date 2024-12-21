"use client";

import { Subtitle } from "../Typography";
import { Calendar } from "./Calendar";
import { GithubProps } from "./GithubProps";
import { User } from "./User";
import { FaGithub } from "react-icons/fa";

export function Github({ info, extra, year = "last" }: GithubProps) {
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <FaGithub size={64} />
      <Subtitle text="Il mio profilo Github" />
      <Calendar username={info.login} year={year} />
      <User info={info} extra={extra} />
    </div>
  );
}
