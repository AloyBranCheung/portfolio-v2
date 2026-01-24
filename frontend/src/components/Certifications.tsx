// since calling next.js api
import axios from "axios";
import * as motion from "motion/react-client";
import type { Certification } from "@/app/api/certification/route";
import { cn, neobrutalist } from "@/lib/utils";
import Image from "next/image";
import dayjs from "@/lib/dayjs";

export default async function Certifications() {
  const certifications = await axios.get(
    `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/certification`,
  );

  if (!certifications.data || certifications.data.docs.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl mb-2">Certifications</h2>
      <div className="flex flex-col gap-2">
        {certifications.data.docs.map((cert: Certification) => (
          <motion.div
            key={cert.id}
            className={cn(
              neobrutalist(),
              "p-4 bg-white flex gap-2 items-center",
            )}
          >
            <Image
              src={cert.icon.url}
              alt={cert.icon.alt}
              width={50}
              height={50}
            />
            <div className="flex flex-col gap-2">
              <h3>{cert.name}</h3>
              <p>{cert.issuingOrganization}</p>
              <p>Issued on: {dayjs(cert.issueDate).format("MMM YYYY")}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
