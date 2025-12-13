import * as Sentry from "@sentry/browser";
import axios from "@/lib/axios";
import type { Project } from "@/types/projects";

export const fetchProjects = async (): Promise<Project[] | null> => {
  try {
    const res = await axios.get("/projects", {
      params: { limit: 0, sort: "-yearWorkedOn" },
    });

    return res.data.docs as Project[];
  } catch (error) {
    console.error("Error fetching About Me global:", error);
    Sentry.captureException(error);
    return null;
  }
};
