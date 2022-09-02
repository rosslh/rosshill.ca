export async function load({ data }) {
  return {
    themeFromSession: data.theme ?? "system",
  };
}
