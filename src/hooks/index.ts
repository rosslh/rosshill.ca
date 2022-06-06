/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event: e, resolve }) {
  const event = e;
  event.locals.theme = event.request.headers.get("cookie")?.split("=")[1].split(";")[0];
  return resolve(event);
}

/** @type {import('@sveltejs/kit').GetSession} */
export function getSession(event) {
  return { theme: event.locals.theme };
}
