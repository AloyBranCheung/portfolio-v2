import { Experience as IExperience } from "@/types/experience";
import ErrorMsg from "./ErrorMsg";
import dayjs from "@/lib/dayjs";
import { neobrutalist } from "@/lib/utils";

interface ExperienceProps {
  data: IExperience[] | null;
}

export default function Experience({ data }: ExperienceProps) {
  if (!data) {
    return <ErrorMsg />;
  }

  return (
    <section id="experience" className="flex flex-col gap-4">
      {data.map((exp) => (
        <div key={exp.id} className={`${neobrutalist()} p-4`}>
          <header>
            {dayjs(exp.startDate).format("MMM YYYY")} -{" "}
            {exp.endDate ? dayjs(exp.endDate).format("MMM YYYY") : "Present"}
          </header>
          <div>
            <h3 className="text-lg">{`${exp.title} · ${exp.company.name}`}</h3>
            <p className="mt-4 text-sm">{exp.description}</p>
          </div>
          <ul className="flex flex-wrap gap-2 mt-4">
            {exp.technologies.map((tech) => (
              <li key={tech.id} className={`${neobrutalist()} p-2 text-xs`}>
                {tech.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
