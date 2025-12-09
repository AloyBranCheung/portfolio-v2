"use client";

import { atom } from "jotai";

// pathname
export const isActiveAtom = atom<string | null>(
  typeof window !== "undefined"
    ? window.location.pathname + window.location.hash
    : "/#about"
);
