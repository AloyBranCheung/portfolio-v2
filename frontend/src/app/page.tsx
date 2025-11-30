import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import { fetchHero, fetchExperience } from "@/utils/fetch-hompage";
import Resume from "@/components/Resume";

// https://nextjs.org/docs/app/guides/incremental-static-regeneration#time-based-revalidation
export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const [heroData, experienceData] = await Promise.all([
    fetchHero(),
    fetchExperience(),
  ]);

  return (
    <div>
      <Hero data={heroData} />
      <Experience data={experienceData} />
      <Resume />
    </div>
  );
}
