import { Button } from "./ui/button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import * as motion from "motion/react-client";
import { interactAnimation } from "@/utils/interact-animation";

export default function Resume() {
  return (
    <motion.div {...interactAnimation} className="py-4">
      <Button
        asChild
        className="cursor-pointer w-full bg-blue-600 text-white dark:bg-blue-400"
      >
        <Link href="/resume.pdf" target="_blank">
          View Full Résumé
          <ExternalLink />
        </Link>
      </Button>
    </motion.div>
  );
}
