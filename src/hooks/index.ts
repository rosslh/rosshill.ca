import Cookies from "universal-cookie";
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const cookieHeader = event.request.headers.get("cookie");
  if (cookieHeader) {
    const cookies = new Cookies(cookieHeader);
    event.locals.theme = cookies.get("theme");
  }
  
  return resolve(event);
};
