import React from "react";

const navbarConfig = [
  {
    name: "About",
    href: "/",
  },
];

export default function Navbar() {
  return (
    <nav className="flex items-center justify-center w-full p-4">
      {navbarConfig.map((item) => (
        <a
          className="font-bold text-xl"
          key={`${item.href}-${item.name}`}
          href={item.href}
        >
          {item.name}
        </a>
      ))}
    </nav>
  );
}
