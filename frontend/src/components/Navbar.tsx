"use client";

import Link from "next/link";
import { HamburgerIcon } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
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

const navItems = [
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  // { href: "/#projects", label: "Projects" },
];

export default function Navbar() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" && !hash;
    if (href.includes("#")) {
      const hrefHash = href.split("#")[1];
      return pathname === "/" && hash === `#${hrefHash}`;
    }
    return pathname === href;
  };

  return (
    <NavigationMenu className="z-5 w-full max-w-none bg-white border-2 border-black shadow-[4px_4px_0px_0px_black] p-4">
      <div className="flex w-full items-center justify-between">
        <Link href="/" className="block cursor-pointer">
          <h1 className="text-base">Brandon Cheung</h1>
          <h2 className="text-sm">Software Developer</h2>
        </Link>
        {isMobile ? (
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="default" size="icon">
                <HamburgerIcon className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <VisuallyHidden>
                <SheetTitle>Navigation Menu</SheetTitle>
                <SheetDescription>Site navigation links</SheetDescription>
              </VisuallyHidden>
              <NavigationMenuList className="flex flex-col gap-4 mt-8 px-4 py-2">
                {navItems.map((item) => {
                  const handleClick = (e: React.MouseEvent) => {
                    setOpen(false);
                    if (item.href.includes("#")) {
                      e.preventDefault();
                      const id = item.href.split("#")[1];
                      setHash(`#${id}`);
                      setTimeout(() => {
                        document
                          .getElementById(id)
                          ?.scrollIntoView({ behavior: "smooth" });
                      }, 300);
                    } else {
                      setHash("");
                    }
                  };
                  if (item.href.includes("#")) {
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={handleClick}
                        className="text-lg"
                      >
                        {item.label}
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleClick}
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
              const handleClick = (e: React.MouseEvent) => {
                if (item.href.includes("#")) {
                  e.preventDefault();
                  const id = item.href.split("#")[1];
                  setHash(`#${id}`);
                  setTimeout(() => {
                    document
                      .getElementById(id)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }, 300);
                } else {
                  setHash("");
                }
              };
              return (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    isActive={isActive(item.href)}
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
      </div>
    </NavigationMenu>
  );
}
