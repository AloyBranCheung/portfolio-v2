import { Experience as IExperience } from "@/types/experience";
import ErrorMsg from "./ErrorMsg";
import ExperienceCard from "./ExperienceCard";
interface ExperienceProps {
  data: IExperience[] | null;
}

export default function Experience({ data }: ExperienceProps) {
  if (!data) {
    return <ErrorMsg />;
  }

  return (
    <section id="experience" className="flex flex-col gap-4 scroll-mt-28">
      {data.map((exp) => (
        <ExperienceCard key={exp.id} exp={exp} />
      ))}
    </section>
  );
}
