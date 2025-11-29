import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import axios from "@/lib/axios";
import { Experience } from "@/types/experience";

export const fetchHero = async (): Promise<{
  richText: SerializedEditorState;
  typingText: { text: string }[];
} | null> => {
  try {
    const res = await axios.get("/globals/about-me");
    return { richText: res.data.description, typingText: res.data["typing-text"] };
  } catch (error) {
    // TODO: sentry logging
    console.error("Error fetching About Me global:", error);
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

    return data;
  }
};
