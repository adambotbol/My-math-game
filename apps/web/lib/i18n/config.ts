import { getRequestConfig } from "next-intl/server";
import fr from "@/messages/fr.json";

export default getRequestConfig(async ({ locale }) => {
  switch (locale) {
    case "fr":
      return { messages: fr };
    case "en":
      return { messages: await import("@/messages/en.json").then((mod) => mod.default) };
    default:
      return { messages: fr };
  }
});
