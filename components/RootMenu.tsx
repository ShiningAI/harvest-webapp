"use client";

import Link, { LinkProps } from "next/link";
import { useTranslations } from "next-intl";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { HTMLAttributeAnchorTarget } from "react";
import { HELP_URL } from "@/lib/constant";

const menus: Array<
  LinkProps & { label: string; target?: HTMLAttributeAnchorTarget }
> = [
  { label: "pricing", href: "/pricing" },
  {
    label: "help",
    target: "_blank",
    href: HELP_URL,
  },
];

export const RootMenu = () => {
  const t = useTranslations("RootMenu");
  return (
    <>
      <div className="hidden md:flex items-center space-x-8">
        {menus.map(({ label, ...props }) => (
          <Link key={label} className="hover:underline" {...props}>
            {t(label)}
          </Link>
        ))}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="md:hidden">
            <MenuIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {menus.map(({ label, ...props }) => (
            <DropdownMenuItem key={label} asChild>
              <Link key={label} className="hover:underline" {...props}>
                {t(label)}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
