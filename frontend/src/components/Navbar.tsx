"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useState } from "react";

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
  { href: "/", label: "About" },
  { href: "/resume", label: "Resume" },
];

export default function Navbar() {
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

  return (
    <NavigationMenu className="z-5 w-full max-w-none">
      <div className="flex w-full items-center justify-between px-4">
        <div>
          <h1 className="text-base">Brandon Cheung</h1>
          <p className="text-sm">Software Developer</p>
        </div>
        {isMobile ? (
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="default" size="icon">
                <Menu className="h-5 w-5" />
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
                    onClick={() => setOpen(false)}
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
                  asChild
                >
                  <Link href={item.href}>{item.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        )}
      </div>
    </NavigationMenu>
  );
}
