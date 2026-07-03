"use server";

import { getData } from "@/lib/net";
import { MuseunHubResponse } from "@/types";

const dummy: MuseunHubResponse = {
  total: 0,
  page: 1,
  pages: 0,
  per_page: 0,
  items: [],
};

export const getArtworks = async (
  query = "",
  limit = 10,
  offset = 0,
  locale = "en",
) => {
  if (query === "") {
    return {
      success: true,
      data: dummy,
    };
  }

  const url = `/museumhub/search?query=${query}&limit=${limit}&offset=${offset}&locale=${locale}`;

  console.log("first", url);

  return await getData<MuseunHubResponse>(url);
};
