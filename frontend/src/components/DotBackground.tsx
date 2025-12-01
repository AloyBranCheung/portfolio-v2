export function DotBackground() {
  // https://ui.aceternity.com/components/grid-and-dot-backgrounds
  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 h-screen w-screen -z-10 bg-[radial-gradient(#d4d4d4_1px,transparent_1px)] bg-size-[20px_20px] dark:bg-black dark:bg-[radial-gradient(#2b2b2b_1px,transparent_1px)]"
      />
      {/* Radial gradient for the container to give a faded look */}
      <div
        aria-hidden="true"
        className="-z-10 pointer-events-none fixed inset-0 flex items-center justify-center bg-white mask-[radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"
      ></div>
    </>
  );
}
