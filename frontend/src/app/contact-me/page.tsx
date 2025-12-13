"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn, neobrutalist } from "@/lib/utils";
import { useActionState } from "react";
import submitForm from "@/actions/contact-me-action";
import { Button } from "@/components/ui/button";
import FormErrMsg from "@/components/FormErrMsg";

export default function ContactMe() {
  const [state, formAction, pending] = useActionState(submitForm, undefined);

  return state?.message === "success" ? (
    <p className={cn(neobrutalist(), "p-4 mt-4")}>
      Success! Thanks for reaching out. I&#39;ll get back to you as soon as I
      can :&#41;.
    </p>
  ) : (
    <form
      action={formAction}
      className={cn("flex flex-col gap-2 mt-2 p-2 md:max-w-96", neobrutalist())}
    >
      <h2>Contact Me</h2>
      <Input name="from" type="email" required placeholder="Your Email" />
      {state?.errors?.properties?.from?.errors && (
        <FormErrMsg>
          {state.errors.properties.from.errors.join(". ")}
        </FormErrMsg>
      )}
      <Input
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
      <Textarea
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
  );
}
