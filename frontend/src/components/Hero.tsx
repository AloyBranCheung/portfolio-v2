import { neobrutalist } from "@/lib/utils";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { RichText } from "@payloadcms/richtext-lexical/react";
import Image from "next/image";
import ErrorMsg from "./ErrorMsg";
import TypingTextWrapper from "./TypingTextWrapper";

interface HeroProps {
  data: {
    richText: SerializedEditorState;
    typingText: { text: string }[];
  } | null;
}

export default function Hero({ data }: HeroProps) {
  return (
    // Warning: Section lacks heading. Consider using h2-h6 elements to add identifying headings to all sections, or else use a div element instead for any cases where no heading is needed.
    <div
      className="py-4 flex flex-col md:flex-row justify-between gap-2 dark:text-white"
      id="about"
    >
      <div className="w-full mb-4 md:mb-0 flex justify-center flex-col">
        {data ? (
          <>
            <TypingTextWrapper typingText={data.typingText} />
            <p>
              <br />
            </p>
            <RichText data={data.richText} />
          </>
        ) : (
          <ErrorMsg />
        )}
      </div>
      <div className="flex items-center justify-center">
        <div className={neobrutalist()}>
          <Image
            alt="Portrait of Brandon in Japan"
            src="/images/hero.avif"
            width={400}
            height={400}
            priority
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}
