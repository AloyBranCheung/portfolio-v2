import { neobrutalist } from "@/lib/utils";

interface PillProps {
  children: React.ReactNode;
}
export default function Pill({ children }: PillProps) {
  return <li className={`${neobrutalist()} p-2 text-xs`}>{children}</li>;
}
