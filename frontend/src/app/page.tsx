import Hero from "@/components/Hero";
import axios from "@/lib/axios";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

export default async function Home() {
  let data: SerializedEditorState | null = null;
  try {
    const res = await axios.get("/globals/about-me");
    data = res.data.description;
  } catch (error) {
    // TODO: sentry logging
    console.error("Error fetching About Me global:", error);
  }

  return (
    <div>
      <Hero data={data} />
    </div>
  );
}
