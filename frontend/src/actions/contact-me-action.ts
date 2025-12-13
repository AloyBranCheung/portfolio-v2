"use server";

import sendEmail from "@/lib/nodemailer";
import { z } from "zod";

const schema = z.object({
  from: z.email(),
  subject: z.string().min(1).max(200),
  text: z.string().min(1),
});

const submitForm = async (_prevState: unknown, formData: FormData) => {
  const rawData = {
    from: formData.get("from") as string,
    subject: formData.get("subject") as string,
    text: formData.get("text") as string,
  };
  const validatedData = schema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      errors: z.treeifyError(validatedData.error),
    };
  }

  await sendEmail(validatedData.data);

  return {
    message: "success",
  };
};

export default submitForm;
