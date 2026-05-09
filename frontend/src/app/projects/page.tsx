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

import Pill from "@/components/Pill";
import InlineExternalLink from "@/components/InlineExternalLink";
import { Button } from "@/components/ui/button";

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
        <Button asChild>
          <a
            target="_blank"
            href="https://github.com/AloyBranCheung"
            rel="noopener noreferrer"
            aria-label="Visit my GitHub profile"
            className="font-bold cursor-pointer"
          >
            See my Github <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>
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
