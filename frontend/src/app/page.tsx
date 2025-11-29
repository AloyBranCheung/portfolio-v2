import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import { fetchHero, fetchExperience } from "@/utils/fetch-hompage";

export default async function Home() {
  const [heroData, experienceData] = await Promise.all([
    fetchHero(),
    fetchExperience(),
  ]);

  return (
    <div>
      <Hero data={heroData} />
      <Experience data={experienceData} />
    </div>
  );
}
