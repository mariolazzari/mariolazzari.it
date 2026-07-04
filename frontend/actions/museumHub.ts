"use server";

import { getData } from "@/lib/net";
import { MuseunHubResponse, Result } from "@/types";

const noRerocrds: MuseunHubResponse = {
  total: 0,
  page: 1,
  pages: 0,
  per_page: 0,
  items: [],
};

type GetArtworks = (
  query: string,
  locale: string,
) => Promise<Result<MuseunHubResponse>>;

export const getArtworks: GetArtworks = async (query, locale) => {
  if (query === "") {
    return {
      success: true,
      data: noRerocrds,
    };
  }

  const url = `/museumhub/search?query=${query}&limit=100&offset=0&locale=${locale}`;

  return await getData<MuseunHubResponse>(url);
};
