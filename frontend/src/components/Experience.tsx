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
        <div key={exp.id} className={`${neobrutalist()} p-2`}>
          <header>
            {dayjs(exp.startDate).format("MMM YYYY")} -{" "}
            {exp.endDate ? dayjs(exp.endDate).format("MMM YYYY") : "Present"}
          </header>
          <div>
            <h3>{`${exp.title} · ${exp.company.name}`}</h3>
            {/* <pre>{exp.description}</pre> */}
          </div>
        </div>
      ))}
    </section>
  );
}
