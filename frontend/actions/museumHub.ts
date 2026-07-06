"use server";

import { getData } from "@/lib/net";
import { ArtWork, Result } from "@/types";

type GetArtworks = (
  query: string,
  locale: string,
) => Promise<Result<ArtWork[]>>;

export const getArtworks: GetArtworks = async (query, locale) => {
  if (query === "") {
    return {
      success: true,
      data: [],
    };
  }

  const url = `/museumhub/search?query=${query}&limit=20&offset=0&locale=${locale}`;

  return await getData<ArtWork[]>(url);
};
