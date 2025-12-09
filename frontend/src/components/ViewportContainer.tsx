/**
 * Height screen but includes footer in the screen
 */

interface ViewportContainerProps {
  children: React.ReactNode;
}
export default function ViewportContainer({
  children,
}: ViewportContainerProps) {
  return <div className="h-[calc(100vh-230px)] relative">{children}</div>;
}
