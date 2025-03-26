import ky from "ky";

import { API_KEY, BASE_URL } from "@/config";

export const api = ky.create({
  prefixUrl: BASE_URL, // Automatically prepends to all requests
  headers: {
    "X-API-KEY": API_KEY,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
