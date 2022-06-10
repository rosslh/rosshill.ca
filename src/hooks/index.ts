import Cookies from "universal-cookie";

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event: e, resolve }) {
  const event = e; // conform to no-param-reassign rule

  const cookieHeader = event.request.headers.get("cookie");
  if (cookieHeader) {
    const cookies = new Cookies(cookieHeader);
    event.locals.theme = cookies.get("theme");
  }
  
  return resolve(event);
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession({ locals }) {
  return { theme: locals.theme };
}
