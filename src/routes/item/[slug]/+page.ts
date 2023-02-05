
import { browser } from "$app/environment";
import type { Load } from "@sveltejs/kit";

const preloadImage = (src: string) => new Promise((r) => {
  const image = new Image();
  image.onload = r;
  image.onerror = r;
  image.src = src;
});

export const load: Load = async ({ data }) => {
  if (browser && data?.post?.image) {
    const webpImageSrc = `/timeline/${data.post.image.name}.webp`;
    await preloadImage(webpImageSrc);
  }
  return data;
};
