"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn, neobrutalist } from "@/lib/utils";
import { useActionState, startTransition } from "react";
import submitForm from "@/actions/contact-me-action";
import { Button } from "@/components/ui/button";
import FormErrMsg from "@/components/FormErrMsg";
import { Label } from "@/components/ui/label";
import Script from "next/script";

export default function ContactMe() {
  const [state, formAction, pending] = useActionState(submitForm, undefined);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValues = e.currentTarget;
    // @ts-expect-error - loaded from script tag
    await grecaptcha.ready(async () => {
      // @ts-expect-error - loaded from script tag
      const token = await grecaptcha.execute(
        process.env.NEXT_PUBLIC_GOOGLE_SITE_KEY!,
        { action: "submit" }
      );
      const formData = new FormData(formValues);
      formData.append("recaptchaToken", token);
      startTransition(() => {
        formAction(formData);
      });
    });
  };

  return state?.message === "success" ? (
    <p
      role="status"
      aria-live="polite"
      className={cn(neobrutalist(), "p-4 mt-4")}
    >
      Success! Thanks for reaching out. I&#39;ll get back to you as soon as I
      can :&#41;.
    </p>
  ) : (
    <div className="md:flex md:justify-center">
      <form
        onSubmit={handleSubmit}
        className={cn(
          "flex flex-col gap-2 mt-2 p-2 md:max-w-96 md:w-full",
          neobrutalist()
        )}
      >
        <h2>Contact Me</h2>

        <Input
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="absolute left-[-9999px]"
          aria-hidden="true"
        />

        <Label htmlFor="from">Email</Label>
        <Input
          id="from"
          name="from"
          type="email"
          required
          placeholder="Your Email"
        />
        {state?.errors?.properties?.from?.errors && (
          <FormErrMsg>
            {state.errors.properties.from.errors.join(". ")}
          </FormErrMsg>
        )}

        <Label htmlFor="subject">Subject</Label>
        <Input
          id="subject"
          name="subject"
          type="text"
          required
          placeholder="Subject"
          minLength={1}
          maxLength={200}
        />
        {state?.errors?.properties?.subject?.errors && (
          <FormErrMsg>
            {state.errors.properties.subject.errors.join(". ")}
          </FormErrMsg>
        )}

        <Label htmlFor="text">Message</Label>
        <Textarea
          id="text"
          name="text"
          placeholder="Your Message"
          required
          minLength={1}
          rows={12}
        />
        {state?.errors?.properties?.text?.errors && (
          <FormErrMsg>
            {state.errors.properties.text.errors.join(". ")}
          </FormErrMsg>
        )}

        <Button disabled={pending} type="submit">
          Submit
        </Button>
      </form>
      <Script
        strategy="afterInteractive"
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_GOOGLE_SITE_KEY}`}
      />
    </div>
  );
}
