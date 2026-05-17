import Cookies from "universal-cookie";
import type { Handle } from "@sveltejs/kit";
import { normalizeSiteTheme } from "$lib/types";

export const handle: Handle = async ({ event, resolve }) => {
  const cookieHeader = event.request.headers.get("cookie");
  if (cookieHeader) {
    const cookies = new Cookies(cookieHeader);
    event.locals.theme = normalizeSiteTheme(cookies.get("theme"));
  }

  return resolve(event);
};
