import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "yd08m03a",
  dataset: "production",
  apiVersion: "2022-04-22", // use current date (YYYY-MM-DD) to target the latest API version
  token: process.env.REACT_APP_TOKEN,
});
