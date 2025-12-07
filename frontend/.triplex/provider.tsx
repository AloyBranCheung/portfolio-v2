import { Lighting } from "../src/components/game/Scene";

export function CanvasProvider({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <Lighting />
      {children}
    </>
  );
}
