"use client";

import { neobrutalist } from "@/lib/utils";
import Five from "./assets/Five";
import Zero from "./assets/Zero";

export default function Page500() {
  return (
    <div className={`${neobrutalist()} h-[calc(100vh-195px)]`}>
      <div className="flex items-center justify-center gap-2">
        <Five />
        <Zero />
        <Zero />
      </div>
    </div>
  );
}
