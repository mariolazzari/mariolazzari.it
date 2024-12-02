"use server";

import { Repo } from "@/types/github/Repo";
import { UserInfo } from "@/types/github/UserInfo";
import { UserReposParams } from "@/types/github/UserReposParams";
import { Octokit, RestEndpointMethodTypes } from "@octokit/rest";

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

// user stars
export async function getUserStars(user: UserInfo): Promise<number> {
  console.time("stars");

  let stars = 0;
  let pages = Math.ceil(user.public_repos / 100);

  const promises: Promise<
    RestEndpointMethodTypes["repos"]["listForUser"]["response"]
  >[] = [];

  while (pages > 0) {
    promises.push(
      octokit.repos.listForUser({
        username: user.login,
        sort: "created",
        direction: "asc",
        per_page: 100,
        page: pages,
      })
    );

    pages--;
  }

  const responses = await Promise.all(promises);
  responses.forEach(res => {
    res.data
      .filter(r => !!r.stargazers_count)
      .forEach(r => {
        if (r.stargazers_count) {
          stars += r.stargazers_count;
        }
      });
  });

  console.timeEnd("stars");

  return stars;
}
