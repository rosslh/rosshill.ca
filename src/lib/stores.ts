import { browser } from "$app/env";
import Cookies from "js-cookie";
import { writable } from "svelte/store";
import type { PostType, SiteTheme } from "./types";

export const showCategories = writable(new Set<PostType>());
export const showTags = writable(new Set<string>());
export const minTagNum = writable(2);

export const cheekyMessagePrinted = writable(false);

const themeFromCookie = ((browser && Cookies.get("theme")) ?? undefined) as SiteTheme;
const mediaQueryTheme = ((browser && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") ?? undefined) as SiteTheme;
const oneYear = 365;

const cookieStore = (key: string, initial: SiteTheme) => {
  const { set: setStore, ...store } = writable(initial);
  if (initial) {
    Cookies.set(key, initial, { expires: oneYear });
  }
  return {
    ...store,
    set: (value: string) => {
      setStore(value as SiteTheme);
      if (browser) {
        Cookies.set(key, value, { expires: oneYear });
      }
    },
  };
};

export const theme = cookieStore("theme", themeFromCookie || mediaQueryTheme);

