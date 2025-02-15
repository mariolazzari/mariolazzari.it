import { Nasa } from "@mariolazzari/nasa-api";

const apiKey = process.env.NASA_API_KEY ?? "DEMO_KEY";

const nasa = new Nasa(apiKey);

// get today picture
export const getTodayApod = async () => await nasa.apodDate();

export const getApods = async (from: Date, to: Date) =>
  await nasa.apodDates(from, to);

export const getRandomApods = async (limit = 10) =>
  await nasa.apodRandom(limit);
