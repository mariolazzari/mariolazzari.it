import { Nasa } from "@mariolazzari/nasa-api";

const apiKey = process.env.NASA_API_KEY ?? "DEMO_KEY";

const nasa = new Nasa(apiKey);

// get today picture
export async function getToday() {
  const apod = await nasa.apodDate();
  return apod;
}
