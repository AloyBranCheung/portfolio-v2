"use client";

import Link from "next/link";
import { HamburgerIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
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
import { useAtom } from "jotai";
import { isActiveAtom } from "@/jotai-atoms/navbar";
import { useRouter } from "next/navigation";

export const navItems = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/tower-blocks", label: "Tower Blocks" },
];

export default function Navbar() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useAtom(isActiveAtom);
  const pathname = usePathname();

  useEffect(() => {
    initMixpanel(); // Initialize Mixpanel
  }, []);

  useEffect(() => {
    const matchesNavItem = navItems.some(
      (item) =>
        item.href === pathname ||
        item.href === `${pathname}#about` ||
        item.href === `${pathname}#experience`
    );
    if (!matchesNavItem) {
      setIsActive(null);
    }
  }, [pathname, setIsActive]);

  return (
    <NavigationMenu className={cn(["w-full max-w-none p-4", neobrutalist()])}>
      <div className="flex w-full items-center justify-between">
        <Link
          href="/"
          onClick={() => setIsActive("/#about")}
          className="block cursor-pointer"
        >
          <h1 className="text-base">Brandon Cheung</h1>
          <h2 className="text-sm">Software Developer</h2>
        </Link>
        <div className="flex items-center gap-2">
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <motion.button
                  suppressHydrationWarning
                  className={`${neobrutalist()} p-2 cursor-pointer`}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  aria-label="Open navigation menu"
                >
                  <HamburgerIcon className="h-5 w-5" />
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
                      // force page transition animation between pages
                      e.preventDefault();
                      setOpen(false);
                      setIsActive(item.href);
                      router.push(item.href);
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
                // force page transition animation between pages
                e.preventDefault();
                setIsActive(item.href);
                router.push(item.href);
              };

              return (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    isActive={isActive === item.href}
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
