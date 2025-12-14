"use server";

import sendEmail from "@/lib/nodemailer";
import { z } from "zod";
import axios from "axios";
import * as Sentry from "@sentry/nextjs";

const schema = z.object({
  from: z.email(),
  subject: z.string().min(1).max(200),
  text: z.string().min(1),
});

const submitForm = async (_prevState: unknown, formData: FormData) => {
  // honeypot check
  const honeypot = formData.get("website");
  if (honeypot) {
    Sentry.captureException("Honeypot detected", {
      extra: { honeypot: honeypot },
    });
    return; // bot detected, silently reject
  }

  // recaptcha
  const recaptchaToken = formData.get("recaptchaToken");
  const response = await axios.post(
    "https://www.google.com/recaptcha/api/siteverify",
    { response: recaptchaToken, secret: process.env.GOOGLE_SECRET_KEY },
    {
      headers: {
        // https://stackoverflow.com/questions/70061153/google-recaptch-invalid-input-response-error
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  if (!response.data.success) {
    Sentry.captureException("reCAPTCHA verification failed", {
      extra: { recaptchaResponse: response.data },
    });
    // say nothing since probably bot
    return;
  }

  // validate
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
