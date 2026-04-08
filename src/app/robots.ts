import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * robots.txt
 * - /manifesto 와 하위 essay 는 내부용이라 인덱싱에서 제외합니다.
 * - 그 외는 모두 허용합니다.
 */
export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url.replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/manifesto", "/manifesto/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
