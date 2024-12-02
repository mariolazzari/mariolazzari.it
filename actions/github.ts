"use server";

import { Repo } from "@/types/github/Repo";
import { UserInfo } from "@/types/github/UserInfo";
import { UserReposParams } from "@/types/github/UserReposParams";
import { Octokit } from "@octokit/rest";

// read token from env
const auth = process.env.GITHUB_TOKEN;
if (!auth) {
  throw new Error("Missing Github token");
}

// init client
const octokit = new Octokit({ auth });

// user info
export async function getUserInfo(): Promise<UserInfo> {
  const { data } = await octokit.users.getAuthenticated();

  return data as UserInfo;
}

// user projects
export async function getUserRepos({
  username = "mariolazzari",
  sort = "updated",
  direction = "desc",
  per_page = 5,
  page = 1,
}: UserReposParams): Promise<Repo[]> {
  const { data } = await octokit.repos.listForUser({
    username,
    sort,
    direction,
    per_page,
    page,
  });

  return data as Repo[];
}
