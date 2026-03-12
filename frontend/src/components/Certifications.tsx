import * as motion from "motion/react-client";
import type { Certification } from "@/app/api/certification/route";
import { cn, neobrutalist } from "@/lib/utils";
import Image from "next/image";
import dayjs from "@/lib/dayjs";
import { ExternalLink } from "lucide-react";
import { interactAnimation } from "@/utils/interact-animation";

export default async function Certifications() {
  // hide backend url
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/certification`,
    { next: { revalidate: 3600 } },
  );

  if (!response.ok) {
    return null;
  }

  const certifications = (await response.json()) as { docs: Certification[] };

  if (!certifications || certifications.docs.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl mb-2 dark:text-white">Certifications</h2>
      <div className="flex flex-col gap-4">
        {certifications.docs.map((cert: Certification) => {
          const hasCredentialUrl =
            cert?.credentialURL && cert.credentialURL.length > 0;

          const content = (
            <>
              <div className="flex justify-between items-center w-full md:w-auto md:flex-col md:gap-0">
                <Image
                  key={cert.icon.id}
                  src={cert.icon.url}
                  alt={cert.icon.alt}
                  width={50}
                  height={50}
                  loading="eager"
                />
                {hasCredentialUrl && <ExternalLink className="md:hidden" />}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <h3>{cert.name}</h3>
                <p>{cert.issuingOrganization}</p>
                <p>Issued on: {dayjs(cert.issueDate).format("MMM YYYY")}</p>
              </div>
              {hasCredentialUrl && (
                <ExternalLink className="hidden md:block md:self-start" />
              )}
            </>
          );

          const className = cn(
            neobrutalist(),
            "p-4 bg-white flex flex-col md:flex-row gap-4 md:gap-6 md:items-center",
          );

          return hasCredentialUrl ? (
            <motion.a
              key={cert.id}
              href={cert.credentialURL!}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
              {...interactAnimation}
            >
              {content}
            </motion.a>
          ) : (
            <motion.div key={cert.id} className={className}>
              {content}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
