import type { MetadataRoute } from "next";
import { site } from "./lib/site";
import { stories } from "../data/stories";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    { path: "/", priority: 1 },
    { path: "/directory", priority: 0.9 },
    { path: "/atlas", priority: 0.8 },
    { path: "/categories", priority: 0.8 },
    { path: "/stories", priority: 0.7 },
    { path: "/playbook", priority: 0.9 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.6 },
    { path: "/credits", priority: 0.4 },
    { path: "/privacy", priority: 0.3 },
    { path: "/terms", priority: 0.3 },
  ];

  const storyRoutes = stories.map((story) => ({
    path: `/stories/${story.slug}`,
    priority: 0.6,
  }));

  return [...routes, ...storyRoutes].map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified: now,
    changeFrequency: route.path === "/" ? "weekly" : "monthly",
    priority: route.priority,
  }));
}
