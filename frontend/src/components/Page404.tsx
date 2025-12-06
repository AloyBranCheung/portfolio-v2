import { neobrutalist } from "@/lib/utils";

export default function Page404() {
  return (
    <div
      className={`${neobrutalist()} flex items-center justify-center min-h-[calc(100vh-195px)]`}
    >
      <p className="p-4">404 Not Found. This 404 page is under construction.</p>
    </div>
  );
}
