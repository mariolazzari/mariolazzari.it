"use server";

import { UserInfo } from "@/types/github/UserInfo";
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
  const { data } = await octokit.request("/user");
  return data as UserInfo;
}

// user projects
export async function getUserProjects() {
  const projects = await octokit.repos.listForUser({
    username: "mariolazzari",
    sort: "created",
    direction: "desc",
    per_page: 10,
    page: 33,
  });

  console.log(projects);
}
