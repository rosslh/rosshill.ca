import type { RequestHandler } from "./$types";

import { renderOgImage } from "$lib/og/renderOgImage";

export const GET: RequestHandler = async ({ setHeaders }) => {
  const png = await renderOgImage();

  setHeaders({
    "content-type": "image/png",
    "cache-control": "public, max-age=86400, s-maxage=2592000",
  });

  return new Response(png);
};
