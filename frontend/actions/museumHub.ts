"use server";

import { getData } from "@/lib/net";
import { MuseunHubResponse } from "@/types";

export const getArtworks = async (query: string, locale = "en") => {
  const url = `/museumhub/search?query=${query}&locale=${locale}`;
  return await getData<MuseunHubResponse>(url);
};
