import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import Experience from "@/components/Experience";
import { fetchHero, fetchExperience, fetchTechStack } from "@/utils/fetch-hompage";
import Resume from "@/components/Resume";
import Certifications from "@/components/Certifications";

// https://nextjs.org/docs/app/guides/incremental-static-regeneration#time-based-revalidation
export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const [heroData, experienceData, techStackData] = await Promise.all([
    fetchHero(),
    fetchExperience(),
    fetchTechStack(),
  ]);

  return (
    <div className="flex flex-col gap-4">
      <Hero data={heroData} />
      <TechStack data={techStackData} />
      <Experience data={experienceData} />
      <Resume />
      <Certifications />
    </div>
  );
}
