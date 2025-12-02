"use client";

import Link from "next/link";
import { HamburgerIcon } from "lucide-react";
import { useState, useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { LucideSun, LucideMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn, neobrutalist } from "@/lib/utils";
import * as motion from "motion/react-client";
import { initMixpanel } from "@/lib/mixpanel";

const navItems = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  // { href: "/#projects", label: "Projects" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(
    navItems[0].href.split("#")[1]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.8 }
    );

    navItems.forEach((item) => {
      if (item.href.includes("#")) {
        const id = item.href.split("#")[1];
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    initMixpanel(); // Initialize Mixpanel
  }, []);

  return (
    <NavigationMenu className={cn(["w-full max-w-none p-4", neobrutalist()])}>
      <div className="flex w-full items-center justify-between">
        <Link href="/" className="block cursor-pointer">
          <h1 className="text-base">Brandon Cheung</h1>
          <h2 className="text-sm">Software Developer</h2>
        </Link>
        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <motion.button
                  className={`${neobrutalist()} p-2 cursor-pointer`}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <HamburgerIcon aria-label="menu" className="h-5 w-5" />
                </motion.button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="dark:bg-black dark:text-white"
              >
                <VisuallyHidden>
                  <SheetTitle>Navigation Menu</SheetTitle>
                  <SheetDescription>Site navigation links</SheetDescription>
                </VisuallyHidden>
                <NavigationMenuList className="flex flex-col gap-4 mt-8 px-4 py-2">
                  {navItems.map((item) => {
                    const handleClick = (
                      e: React.MouseEvent<HTMLAnchorElement>
                    ) => {
                      e.preventDefault();
                      setOpen(false);
                      const id = item.href.split("#")[1];
                      setActiveSection(id);
                      setTimeout(() => {
                        const element = document.getElementById(id);
                        if (element) {
                          const offset = 100;
                          const elementPosition =
                            element.getBoundingClientRect().top;
                          const offsetPosition =
                            elementPosition + window.scrollY - offset;
                          window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth",
                          });
                        }
                      }, 300);
                    };
                    if (item.href.includes("#")) {
                      return (
                        <a
                          onClick={handleClick}
                          key={item.href}
                          href={item.href}
                          className="text-lg"
                        >
                          {item.label}
                        </a>
                      );
                    }

                    return (
                      <Link
                        onClick={handleClick}
                        key={item.href}
                        href={item.href}
                        className="text-lg"
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </NavigationMenuList>
              </SheetContent>
            </Sheet>
          </div>

          <NavigationMenuList className="hidden md:flex">
            {navItems.map((item) => {
              const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                const id = item.href.split("#")[1];

                setActiveSection(id);
                setTimeout(() => {
                  const element = document.getElementById(id);
                  if (element) {
                    const offset = 100;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition =
                      elementPosition + window.scrollY - offset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: "smooth",
                    });
                  }
                }, 300);
              };

              return (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    isActive={activeSection === item.href.split("#")[1]}
                    asChild
                  >
                    {item.href.includes("#") ? (
                      <a
                        href={item.href}
                        onClick={handleClick}
                        className="dark:text-white"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={handleClick}
                        className="dark:text-white"
                      >
                        {item.label}
                      </Link>
                    )}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>

          <motion.button
            className={`${neobrutalist()} p-2 cursor-pointer`}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => {
              if (theme === "dark") {
                setTheme("light");
              } else {
                setTheme("dark");
              }
            }}
          >
            <LucideMoon className="h-5 w-5 dark:hidden" />
            <LucideSun className="h-5 w-5 hidden dark:inline" />
            <span className="sr-only">Toggle Theme</span>
          </motion.button>
        </div>
      </div>
    </NavigationMenu>
  );
}
