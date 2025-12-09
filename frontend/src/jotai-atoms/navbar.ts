"use client";

import { atom } from "jotai";

// pathname
export const isActiveAtom = atom(
  typeof window !== "undefined"
    ? window.location.pathname + window.location.hash
    : "/#about"
);
