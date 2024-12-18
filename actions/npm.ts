"use server";

import { SearchResponse } from "@/types/npm/SearchRessponse";

const API_URI = "https://registry.npmjs.com/-/v1";

export async function getNpms(user = "@mariolazzari") {
  const uri = `${API_URI}/search?text=${user}`;
  const res = await fetch(uri);

  if (!res.ok) {
    throw new Error("Error fetching npm packages");
  }

  const data: SearchResponse = await res.json();

  return data;
}
