import { browser } from "$app/environment";
import { loadTranslations, locale } from "$lib/translations";
import * as cookie from "cookie";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ url }: { url: URL }) => {
  const { pathname } = url;

  let defaultLocale = "en";
  const parsedCookies = browser ? cookie.parse(document.cookie) : {};
  if (parsedCookies.language) {
    defaultLocale = parsedCookies.language;
  }

  const initLocale: string = locale.get() ?? defaultLocale;

  await loadTranslations(initLocale, pathname);

  return {};
};
