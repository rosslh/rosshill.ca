import { browser } from "$app/environment";
import type { Load } from "@sveltejs/kit";

const preloadImage = (source: string): Promise<unknown> => new Promise((resolve) => {
  const image = new Image();
  image.addEventListener('load', resolve);
  image.onerror = resolve;
  image.src = source;
});

export const load: Load = async ({ data }) => {
  if (browser && data?.post?.image) {
    const webpImageSource = `/timeline/${data.post.image.name}.webp`;
    await preloadImage(webpImageSource);
  }
  return data;
};
