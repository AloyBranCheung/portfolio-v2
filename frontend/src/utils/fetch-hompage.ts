import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import axios from "@/lib/axios";
import { Experience } from "@/types/experience";
import { TechStackItem } from "@/types/tech-stack";
import * as Sentry from "@sentry/browser";

export const fetchHero = async (): Promise<{
  richText: SerializedEditorState;
  typingText: { text: string }[];
} | null> => {
  try {
    const res = await axios.get("/globals/about-me");
    return {
      richText: res.data.description,
      typingText: res.data["typing-text"],
    };
  } catch (error) {
    console.error("Error fetching About Me global:", error);
    Sentry.captureException(error);
    return null;
  }
};

export const fetchExperience = async (): Promise<Experience[] | null> => {
  let data: Experience[] | null = null;
  try {
    const res = await axios.get("/experience", {
      params: { limit: 0, sort: "-startDate" },
    });
    data = res.data;
    if (!data || !("docs" in data) || !data.docs) {
      throw new Error("No data returned from API");
    }
    return data.docs as Experience[];
  } catch (error) {
    console.error("Error fetching Experience data:", error);
    Sentry.captureException(error);
    return data;
  }
};

export const fetchTechStack = async (): Promise<TechStackItem[] | null> => {
  let data: TechStackItem[] | null = null;
  try {
    const res = await axios.get("/tech-stack", {
      params: { limit: 0, sort: "order" },
    });
    data = res.data;
    if (!data || !("docs" in data) || !data.docs) {
      throw new Error("No data returned from API");
    }
    return data.docs as TechStackItem[];
  } catch (error) {
    console.error("Error fetching Tech Stack data:", error);
    Sentry.captureException(error);
    return data;
  }
};
