"use client";

import React, { useEffect } from "react";
import { navItems } from "@/components/Navbar";
import { useAtom } from "jotai";
import { isActiveAtom } from "@/jotai-atoms/navbar";

interface TemplateProps {
  children: React.ReactNode;
}
/**
 * use template.tsx since the 'layout' will re-render every page versus
 * layout.tsx will not, this is to fix a bug where intersection observer does
 * not remount once unmounted i.e. when navigating from / to /page and then back
 * to /, the intersection observer stops working
 */
export default function Template({ children }: TemplateProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setIsActive] = useAtom(isActiveAtom);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsActive(`${window.location.pathname}#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.65 }
    );

    navItems.forEach((item) => {
      if (item.href.includes("#")) {
        const id = item.href.split("#")[1];
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [setIsActive]);

  return children;
}
