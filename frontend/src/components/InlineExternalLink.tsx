import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface InlineExternalLinkProps {
  href?: string;
  label?: string;
  className?: string;
}
export default function InlineExternalLink({
  href,
  label,
  className,
}: InlineExternalLinkProps) {
  const content = (
    <span>
      {label ? label : href} {href && <ExternalLink className="inline" />}
    </span>
  );
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={cn("inline-flex", href && "cursor-pointer", className)}
      >
        {content}
      </a>
    );
  }
  return content;
}
