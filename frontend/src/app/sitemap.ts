import type { MetadataRoute } from "next";
import { fetchExperience } from "@/utils/fetch-hompage";
import { fetchProjects } from "@/utils/fetch-projects";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://brandoncheung.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [experiences, projects] = await Promise.all([
    fetchExperience(),
    fetchProjects(),
  ]);

  const experienceUpdates =
    experiences?.map((exp) => new Date(exp.updatedAt)) || [];
  const homeLastMod = experienceUpdates.length
    ? new Date(Math.max(...experienceUpdates.map((d) => d.getTime())))
    : new Date();

  const projectUpdates =
    projects?.map((proj) => new Date(proj.updatedAt)) || [];
  const projectsLastMod = projectUpdates.length
    ? new Date(Math.max(...projectUpdates.map((d) => d.getTime())))
    : new Date();

  return [
    {
      url: BASE_URL,
      lastModified: homeLastMod,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: projectsLastMod,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact-me`,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
