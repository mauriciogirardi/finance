"use client";

import { usePathname, useRouter } from "next/navigation";
import { NavButton } from "./nav-button";
import { useMedia } from "react-use";
import { useState } from "react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const routes = [
  {
    href: "/",
    label: "Overview",
  },
  {
    href: "/transactions",
    label: "Transactions",
  },
  {
    href: "/accounts",
    label: "Accounts",
  },
  {
    href: "/categories",
    label: "Categories",
  },
  {
    href: "/settings",
    label: "Settings",
  },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMedia("(max-width: 1024px)", false);

  const handleNavigationMenu = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            aria-label="open menu"
            className="bg-white/10 h-7 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition"
          >
            <MenuIcon className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-2">
          <SheetTitle className="sr-only">Menu</SheetTitle>

          <nav>
            <ul className="flex flex-col gap-y-2 pt-6">
              {routes.map((route) => (
                <Button
                  key={route.href}
                  variant={pathname === route.href ? "secondary" : "ghost"}
                  onClick={() => handleNavigationMenu(route.href)}
                  className="justify-start"
                >
                  {route.label}
                </Button>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav>
      <ul className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
        {routes.map((route) => (
          <NavButton
            key={route.href}
            isActive={pathname === route.href}
            {...route}
          />
        ))}
      </ul>
    </nav>
  );
}
