import { Technology } from "./experience";

export interface Project {
  id: string;
  name: string;
  technologies: Technology[];
  link: string;
  yearWorkedOn: string; // UTC-0
  madeAt: { name: string } | null;
  updatedAt: string; // UTC-0
  createdAt: string; // UTC-0
}
