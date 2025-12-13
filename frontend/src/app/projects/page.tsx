import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchProjects } from "@/utils/fetch-projects";
import dayjs from "@/lib/dayjs";
import { Github } from "lucide-react";
import Pill from "@/components/Pill";
import { Button } from "@/components/ui/button";
import InlineExternalLink from "@/components/InlineExternalLink";

export const revalidate = 3600; // Revalidate every hour

export default async function Projects() {
  const projects = await fetchProjects();

  if (!projects || projects.length === 0)
    return (
      <section className="mt-2 p-2 flex flex-col gap-4">
        <h2 className="font-bold text-4xl dark:text-white">All Projects</h2>
        <p className="text-foreground dark:text-white">No projects listed.</p>
      </section>
    );

  return (
    <section className="mt-2 p-2 flex flex-col gap-4">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        <h2 className="font-bold text-4xl dark:text-white">All Projects</h2>
        <Button className="font-bold cursor-pointer">
          See my Github <Github />
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Year</TableHead>
            <TableHead>Project</TableHead>
            <TableHead className="hidden md:table-cell">Made At</TableHead>
            <TableHead className="hidden md:table-cell">Technologies</TableHead>
            <TableHead className="hidden md:table-cell">Link</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>
                {dayjs(project.yearWorkedOn).format("YYYY")}
              </TableCell>
              <TableCell>
                <span className="hidden md:inline">{project.name}</span>
                <InlineExternalLink
                  className="md:hidden"
                  href={project.link}
                  label={project.name}
                />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {project.madeAt?.name}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <ul className="flex w-full flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Pill key={tech.id}>{tech.name}</Pill>
                  ))}
                </ul>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {project.link && <InlineExternalLink href={project.link} />}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
