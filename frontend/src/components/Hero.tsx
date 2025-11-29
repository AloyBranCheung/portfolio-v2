import { neobrutalist } from "@/lib/utils";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { RichText } from "@payloadcms/richtext-lexical/react";
import Image from "next/image";
import ErrorMsg from "./ErrorMsg";
import TypingText from "./ui/shadcn-io/typing-text";

interface HeroProps {
  data: SerializedEditorState | null;
}

export default function Hero({ data }: HeroProps) {
  return (
    <section
      className="py-4 flex flex-col md:flex-row justify-between gap-2"
      id="about"
    >
      <div className="w-full mb-4 md:mb-0 flex justify-center flex-col">
        <TypingText
          text={[
            "Hi, I'm Brandon.",
            "Let's build something beautiful together :)",
          ]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
          className="font-bold"
          textColors={["black"]}
          variableSpeed={{ min: 50, max: 120 }}
        />
        <p>
          <br />
        </p>
        {data ? <RichText data={data} /> : <ErrorMsg />}
      </div>
      <div className="flex items-center justify-center">
        <div className={neobrutalist()}>
          <Image
            alt="Portrait of Brandon in business casual attire"
            src="/images/hero.avif"
            width={400}
            height={400}
            priority
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
