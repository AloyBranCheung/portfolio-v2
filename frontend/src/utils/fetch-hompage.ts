import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import axios from "@/lib/axios";
import { Experience } from "@/types/experience";

export const fetchHero = async () => {
  let data: SerializedEditorState | null = null;
  try {
    const res = await axios.get("/globals/about-me");
    data = res.data.description;
    return data;
  } catch (error) {
    // TODO: sentry logging
    console.error("Error fetching About Me global:", error);
    return data;
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

    return data;
  }
};
