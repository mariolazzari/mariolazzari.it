"use server";

import { DownloadsResponse } from "@/types/npm/DownloadsResponse";
import { SearchResponse } from "@/types/npm/SearchRessponse";
import { formatDate } from "date-fns";

const API_URI = "https://api.npmjs.org";

export async function getNpms(user = "@mariolazzari") {
  const uri = `${API_URI}/search?text=${user}`;
  const res = await fetch(uri);

  if (!res.ok) {
    throw new Error("Error fetching npm packages");
  }

  const data: SearchResponse = await res.json();

  return data;
}

export async function getNpmDownloads(
  name: string,
  from: Date,
  to: Date
): Promise<DownloadsResponse> {
  const start = formatDate(from, "yyyy-MM-dd");
  const end = formatDate(to, "yyyy-MM-dd");
  const uri = `${API_URI}/downloads/range/${start}:${end}/${name}`;

  const res = await fetch(uri);
  if (!res.ok) {
    throw new Error("Error fetching npm downloads");
  }
  const data: DownloadsResponse = await res.json();

  return data;
}
