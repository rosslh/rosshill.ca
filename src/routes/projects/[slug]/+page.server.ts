import { redirect } from "@sveltejs/kit";
import type { Load } from "@sveltejs/kit";

export const load: Load = async ({ params }) => {
  redirect(308, `/experience/${params.slug}`);
};
