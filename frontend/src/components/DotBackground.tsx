import { cn } from "@/lib/utils";

export const dotBackgroundCn =
  "border-black dark:border-white bg-white bg-[radial-gradient(#c4c4c4_1px,transparent_1px)] bg-size-[20px_20px] dark:bg-black dark:bg-[radial-gradient(#3b3b3b_1px,transparent_1px)]";

export function DotBackground() {
  // https://ui.aceternity.com/components/grid-and-dot-backgrounds
  return (
    <>
      <div
        aria-hidden="true"
        className={cn("fixed inset-0 h-screen w-screen -z-10", dotBackgroundCn)}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div
        aria-hidden="true"
        className="-z-10 pointer-events-none fixed inset-0 flex items-center justify-center bg-white mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"
      ></div>
    </>
  );
}
