"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogIn, Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { handleRegister } from "../_actions/login";

export function Header() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [{ href: "#profissionais", label: "Profissionais" }];

  async function handleLogin() {
    await handleRegister("google");
  }

  const navLinkClass =
    "flex w-full items-center justify-center md:w-auto text-base font-medium text-zinc-900 transition-colors hover:text-zinc-700";

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Link
          onClick={() => setIsOpen(false)}
          key={item.href}
          href={item.href}
          className={navLinkClass}
        >
          {item.label}
        </Link>
      ))}

      {status === "loading" ? (
        <></>
      ) : session ? (
        <Link
          href={"/dashboard"}
          onClick={() => setIsOpen(false)}
          className={navLinkClass}
        >
          Acessar clinica
        </Link>
      ) : (
        <Button onClick={handleLogin}>
          <LogIn /> Portal da clinica
        </Button>
      )}
    </>
  );

  return (
    <header className="fixed top-0 right-0 left-0 z-[999] py-4 px-6 bg-white">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold text-zinc-900">
          Clinica<span className="text-emerald-500">PRO</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <NavLinks />
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button className="text-black" variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="z-[9999] w-[240px] sm:w-[300px] px-6 pt-14"
          >
            <SheetHeader className="px-0 pt-0">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Veja nossos links</SheetDescription>
            </SheetHeader>
            <nav className="flex flex-col gap-3">
              <NavLinks />
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
