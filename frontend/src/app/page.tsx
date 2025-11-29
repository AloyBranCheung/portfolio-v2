import axios from "@/lib/axios";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

export default async function Home() {
  const res = await axios.get("/globals/about-me");
  const data = res.data;

  return <RichText data={data.description as SerializedEditorState} />;
}
