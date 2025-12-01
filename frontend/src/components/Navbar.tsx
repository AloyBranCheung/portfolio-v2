"use client";

import Link from "next/link";
import { HamburgerIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
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
import { Button } from "@/components/ui/button";
import { LucideSun, LucideMoon } from "lucide-react";
import { useTheme } from "next-themes";

const navItems = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  // { href: "/#projects", label: "Projects" },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const isMobile = useIsMobile();
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

  return (
    <NavigationMenu className="w-full max-w-none bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] p-4">
      <div className="flex w-full items-center justify-between">
        <Link href="/" className="block cursor-pointer">
          <h1 className="text-base">Brandon Cheung</h1>
          <h2 className="text-sm">Software Developer</h2>
        </Link>
        <div className="flex items-center gap-2">
          {isMobile ? (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="default" size="icon">
                  <HamburgerIcon aria-label="menu" className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
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
          ) : (
            <NavigationMenuList>
              {navItems.map((item) => {
                const handleClick = (
                  e: React.MouseEvent<HTMLAnchorElement>
                ) => {
                  e.preventDefault();
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

                return (
                  <NavigationMenuItem key={item.href}>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      isActive={activeSection === item.href.split("#")[1]}
                      asChild
                    >
                      {item.href.includes("#") ? (
                        <a href={item.href} onClick={handleClick}>
                          {item.label}
                        </a>
                      ) : (
                        <Link href={item.href} onClick={handleClick}>
                          {item.label}
                        </Link>
                      )}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          )}
          <Button
            size="icon"
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
          </Button>
        </div>
      </div>
    </NavigationMenu>
  );
}
