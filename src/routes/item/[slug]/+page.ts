
import { browser } from "$app/environment";

const preloadImage = (src: string) => new Promise((r) => {
  const image = new Image();
  image.onload = r;
  image.onerror = r;
  image.src = src;
});

export async function load({ data: props }) {
  const { post } = props;
  if (browser && post.image) {
    const webpImageSrc = `/timeline/${post.image.name}.webp`;
    await preloadImage(webpImageSrc);
  }
  return props;
}
