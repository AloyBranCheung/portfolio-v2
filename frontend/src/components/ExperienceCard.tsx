import dayjs from "@/lib/dayjs";
import { neobrutalist } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { Experience as IExperience } from "@/types/experience";
import * as motion from "motion/react-client";
import { interactAnimation } from "@/utils/interact-animation";

interface ExperienceCardProps {
  exp: IExperience;
}

export default function ExperienceCard({ exp }: ExperienceCardProps) {
  return (
    <motion.a
      href={exp.companyUrl}
      target="_blank"
      rel="noopener noreferrer"
      key={exp.id}
      className={`${neobrutalist()} p-4 bg-white`}
      {...interactAnimation}
    >
      <div className="flex items-center justify-between mb-2">
        <header suppressHydrationWarning>
          {dayjs(exp.startDate).format("MMM YYYY")} -{" "}
          {exp.endDate ? dayjs(exp.endDate).format("MMM YYYY") : "Present"}
        </header>
        <ExternalLink />
      </div>
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
    </motion.a>
  );
}
