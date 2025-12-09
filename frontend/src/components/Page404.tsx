import TowerBlocksGame from "./game";

export default function Page404() {
  return (
    <div className="h-[calc(100vh-230px)] relative">
      <TowerBlocksGame
        message={
          <>
            <h2 className="text-xl md:text-5xl">Error 404: Page not found.</h2>
            <p className="md:text-xl">
              But, you found my game.&nbsp;
              <span className="md:hidden">
                Tap the blocks to get started.&nbsp;
              </span>
              <span className="hidden md:inline">
                Click the blocks or press &#8216;space&#8217; to get
                started.&nbsp;
              </span>
            </p>
          </>
        }
      />
    </div>
  );
}
