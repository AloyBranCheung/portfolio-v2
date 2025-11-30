import { Button } from "./ui/button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import * as motion from "motion/react-client";
import { interactAnimation } from "@/utils/interact-animation";

export default function Resume() {
  return (
    <motion.div {...interactAnimation} className="py-4">
      <Button asChild className="cursor-pointer w-full">
        <Link href="/resume.pdf" target="_blank">
          View Full Résumé
          <ExternalLink />
        </Link>
      </Button>
    </motion.div>
  );
}
