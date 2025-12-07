import { Button } from "../ui/button";

interface GameUIProps {
  isGameOver: boolean;
  onReset: () => void;
}

export default function GameUI({ isGameOver, onReset }: GameUIProps) {
  return (
    <section className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <div className="flex items-center justify-center flex-col gap-4 p-4 md:mt-12">
        <h2 className="text-xl md:text-5xl">Error 404: Page not found.</h2>
        <p className="md:text-xl">
          But, you found my game.&nbsp;
          <span className="md:hidden">
            Tap the blocks to get started.&nbsp;
          </span>
          <span className="hidden md:inline">
            Click the blocks or press &#8216;space&#8217; to get started.&nbsp;
          </span>
          Try your best to beat my highscore! :&#41;
        </p>
        {isGameOver && (
          <Button className="pointer-events-auto" onClick={onReset}>
            Reset Game
          </Button>
        )}
      </div>
    </section>
  );
}
