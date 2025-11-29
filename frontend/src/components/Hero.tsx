import { neobrutalist } from "@/lib/utils";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { RichText } from "@payloadcms/richtext-lexical/react";
import Image from "next/image";

interface HeroProps {
  data: SerializedEditorState | null;
}

export default function Hero({ data }: HeroProps) {
  return (
    <section
      className="py-8 flex flex-col md:flex-row justify-between gap-2"
      id="#about"
    >
      <div className="w-full mb-4 md:mb-0">
        {data ? (
          <RichText data={data} />
        ) : (
          <p>
            Oops...something went wrong. I&apos;ll take a look when I get the
            chance.
          </p>
        )}
      </div>
      <div className="flex items-center justify-center">
        <div className={neobrutalist()}>
          <Image
            alt="Portrait of Brandon in business casual attire"
            src="/images/hero.jpg"
            width={400}
            height={400}
          />
        </div>
      </div>
    </section>
  );
}
