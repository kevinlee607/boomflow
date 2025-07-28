import i18n, { type Config, type Parser } from "sveltekit-i18n";

import lang from "./lang.json";
export const config: Config = {
  fallbackLocale: "zh",
  translations: {
    en: { lang },
    zh: { lang },
  },
  loaders: [
    {
      locale: "en",
      key: "flow",
      loader: async () => await import("./en/flow.json"),
    },
    {
      locale: "en",
      key: "common",
      loader: async () => await import("./en/common.json"),
    },
    {
      locale: "en",
      key: "nav",
      loader: async () => await import("./en/nav.json"),
    },
    {
      locale: "zh",
      key: "flow",
      loader: async () => await import("./zh/flow.json"),
    },
    {
      locale: "zh",
      key: "common",
      loader: async () => await import("./zh/common.json"),
    },
    {
      locale: "zh",
      key: "nav",
      loader: async () => await import("./en/nav.json"),
    },
  ],
};
export const { t, loading, locales, locale, loadTranslations, setLocale } =
  new i18n<Parser.Params<{ item?: string }>>(config);

loading.subscribe(
  ($loading) => $loading && console.log("Loading translations..."),
);
