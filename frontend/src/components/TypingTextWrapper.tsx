"use client";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
const TypingText = dynamic(() => import("./ui/shadcn-io/typing-text"), {
  ssr: false,
});

interface TypingTextWrapperProps {
  typingText: { text: string }[];
}

export default function TypingTextWrapper({
  typingText,
}: TypingTextWrapperProps) {
  const { theme } = useTheme();
  return (
    <TypingText
      suppressHydrationWarning
      text={typingText.map((item) => item.text)}
      typingSpeed={150}
      pauseDuration={1500}
      showCursor={true}
      cursorCharacter="█"
      className="font-bold text-lg dark:text-white"
      // have to do it this way with use client, dynamic import ssr false and useTheme since cannot set tailwind classes for text color
      textColors={[theme === "dark" ? "white" : "black"]}
      variableSpeed={{ min: 50, max: 120 }}
    />
  );
}
