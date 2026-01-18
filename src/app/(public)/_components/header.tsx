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
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type NavItem = {
  href: string;
  label: string;
};

const NAV_ITEMS: NavItem[] = [
  { href: "#vantagens", label: "Vantagens" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#para-quem", label: "Para quem é" },
  { href: "#planos", label: "Planos" },
  { href: "#contato", label: "Contato" },
];

const LOGIN_HREF = "/api/auth/signin";
// TODO: trocar para a rota de cadastro/onboarding quando existir no projeto.
const CTA_HREF = "/#contato";

const NAV_LINK_CLASS =
  "rounded-md px-2 py-1 text-base font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 lg:w-auto";

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className={NAV_LINK_CLASS}
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 8);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "border-b border-border/70 bg-background/80 shadow-sm backdrop-blur-lg "
          : "border-b border-transparent",
      )}
    >
      <div className="container mx-auto flex h-20 items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-1 text-2xl font-semibold text-foreground sm:text-3xl"
        >
          <span>Clinica</span>
          <span className="text-primary">PRO</span>
        </Link>
        <nav
          className="hidden flex-1 items-center justify-center gap-4 lg:flex lg:gap-6"
          aria-label="Navegção principal"
        >
          <NavLinks />
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="rounded-3xl text-muted-foreground landing-button"
          >
            <Link href={LOGIN_HREF}>Entrar</Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="rounded-3xl gradient-primary text-primary-foreground hover:opacity-90 landing-button"
          >
            <Link href={LOGIN_HREF}>Teste grátis</Link>
          </Button>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <div className="ml-auto rounded-full border border-border/70 p-1 lg:hidden">
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon-lg"
                className="rounded-full text-muted-foreground"
                aria-label="Abrir menu"
              >
                <Menu className="size-6" />
              </Button>
            </SheetTrigger>
          </div>

          <SheetContent side="right" className="w-72 px-6 pt-12">
            <SheetHeader className="px-0 pt-0 text-left">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Navegue pelas seções</SheetDescription>
            </SheetHeader>
            <nav
              className="mt-4 flex flex-col gap-2"
              aria-label="Navegação principal"
            >
              <NavLinks onNavigate={() => setIsOpen(false)} />
            </nav>
            <div className="mt-6 flex flex-col gap-3 ">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-3xl landing-button"
              >
                <Link href={LOGIN_HREF} onClick={() => setIsOpen(false)}>
                  Entrar
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="rounded-3xl gradient-primary text-primary-foreground hover:opacity-90 landing-button"
              >
                <Link href={CTA_HREF} onClick={() => setIsOpen(false)}>
                  Teste grátis
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
