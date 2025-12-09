import TowerBlocksGame from "./game";
import ViewportContainer from "./ViewportContainer";
import GameInstructions from "./game/GameInstructions";

export default function Page404() {
  return (
    <ViewportContainer>
      <TowerBlocksGame
        message={
          <>
            <h2 className="text-xl md:text-5xl">Error 404: Page not found.</h2>
            <GameInstructions mainMessage="But, you found my game." />
          </>
        }
      />
    </ViewportContainer>
  );
}
