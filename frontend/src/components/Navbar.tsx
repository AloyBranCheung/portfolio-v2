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
  { href: "/", label: "Home" },
  { href: "/#experience", label: "Experience" },
  { href: "/#projects", label: "Projects" },
];

export default function Navbar() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [hash, setHash] = useState(
    typeof window !== "undefined" ? window.location.hash : ""
  );

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
          <p className="text-sm">Software Developer</p>
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
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      setOpen(false);
                      if (item.href.includes("#")) {
                        setHash(`#${item.href.split("#")[1]}`);
                      } else {
                        setHash("");
                      }
                    }}
                    className="text-lg"
                  >
                    {item.label}
                  </Link>
                ))}
              </NavigationMenuList>
            </SheetContent>
          </Sheet>
        ) : (
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  isActive={isActive(item.href)}
                  asChild
                >
                  <Link
                    href={item.href}
                    onClick={() => {
                      if (item.href.includes("#")) {
                        setHash(`#${item.href.split("#")[1]}`);
                      } else {
                        setHash("");
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        )}
      </div>
    </NavigationMenu>
  );
}
