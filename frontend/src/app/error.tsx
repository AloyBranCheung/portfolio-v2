"use client";
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import Page500 from "@/components/Page500";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);
  return <Page500 />;
}
