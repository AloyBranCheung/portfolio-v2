import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="px-4 py-4 mt-2 flex items-center justify-center gap-4">
      <a
        target="_blank"
        href="https://github.com/AloyBranCheung"
        rel="noopener noreferrer"
      >
        <Github />
      </a>
      <a
        target="_blank"
        href="https://www.linkedin.com/in/aloysiuscheung/"
        rel="noopener noreferrer"
      >
        <Linkedin />
      </a>
    </footer>
  );
}
