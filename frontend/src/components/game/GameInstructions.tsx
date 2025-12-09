interface GameInstructionsProps {
  mainMessage?: string;
}

export default function GameInstructions({
  mainMessage,
}: GameInstructionsProps) {
  return (
    <p className="md:text-xl">
      {mainMessage && mainMessage.length > 0
        ? mainMessage
        : "Stack the blocks as high as you can."}
      &nbsp;
      <span className="md:hidden">Tap the blocks to get started.&nbsp;</span>
      <span className="hidden md:inline">
        Click the blocks or press &#8216;space&#8217; to get started.&nbsp;
      </span>
    </p>
  );
}
