"use server";

import { getData } from "@/lib/net";
import { ArtWork, Paginated, Result } from "@/types";

type GetArtworks = (
  query: string,
  locale: string,
  limit: string,
  offset: string,
) => Promise<Result<Paginated<ArtWork[]>>>;

export const getArtworks: GetArtworks = async (
  query,
  locale,
  limit,
  offset,
) => {
  if (query === "") {
    return {
      success: true,
      data: {
        page: 0,
        pages: 0,
        per_page: 0,
        total: 0,
        data: [],
      },
    };
  }

  const url = `/museumhub/search?query=${query}&limit=${limit}&offset=${offset}&locale=${locale}`;

  return await getData<Paginated<ArtWork[]>>(url);
};
