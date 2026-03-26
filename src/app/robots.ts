import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/feed", "/feed/", "/create", "/register", "/login"],
        disallow: ["/admin", "/wallet", "/profile", "/notifications", "/submit"],
      },
    ],
    sitemap: "https://dareme.app/sitemap.xml",
  };
}
