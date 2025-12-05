import { Github, Linkedin } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-4 py-4 mt-2 flex items-center justify-center gap-4 dark:text-white flex-col">
      <div className="flex items-center gap-4">
        <a
          target="_blank"
          href="https://github.com/AloyBranCheung"
          rel="noopener noreferrer"
          aria-label="Visit my GitHub profile"
        >
          <Github />
        </a>
        <a
          target="_blank"
          href="https://www.linkedin.com/in/aloysiuscheung/"
          rel="noopener noreferrer"
          aria-label="Visit my LinkedIn profile"
        >
          <Linkedin />
        </a>
      </div>
      <Link className="text-xs" href="/500">
        Check out my Error 500 page
      </Link>
    </footer>
  );
}
