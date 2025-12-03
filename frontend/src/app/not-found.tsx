import { neobrutalist } from "@/lib/utils";

export default function NotFound() {
  return (
    <div
      className={`${neobrutalist()} flex items-center justify-center min-h-[calc(100vh-195px)]`}
    >
      404
    </div>
  );
}
