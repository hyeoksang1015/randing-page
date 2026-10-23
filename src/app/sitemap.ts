import type { MetadataRoute } from "next";
import { works } from "@/data/portfolio";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${site.url}/`, priority: 1 }, ...works.map((w) => ({ url: `${site.url}/portfolio/${w.slug}/`, priority: 0.7 }))];
}
