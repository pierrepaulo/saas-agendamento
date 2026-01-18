import { Button } from "@/components/ui/button";
import { ArrowBigDown, ArrowBigRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background bg-[url('/clinic-bg-hero.png')] bg-cover bg-center">
      <div
        className="pointer-events-none absolute inset-0 bg-background/85"
        aria-hidden="true"
      />
      <div className="container relative z-10 mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-3xl text-balance">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground sm:text-sm">
            A solução completa para sua clínica
          </span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Automatize sua clínica.{" "}
            <span className="gradient-primary bg-clip-text text-transparent">
              Ganhe tempo todos os dias.
            </span>
          </h1>
          <p className="mt-5 text-base text-muted-foreground sm:text-lg font-semibold">
            Organize profissionais e horários, confirme consultas
            automaticamente e reduza cancelamentos.
          </p>
          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center mb-3">
            <Button
              asChild
              size="lg"
              className="h-12 w-full px-10 text-base gradient-primary text-primary-foreground hover:opacity-90 sm:h-14 sm:flex-1 sm:px-14 sm:text-lg rounded-3xl landing-button"
            >
              <Link
                href="/api/auth/signin"
                className="inline-flex w-full items-center justify-center gap-2"
              >
                Começar teste grátis
                <ArrowBigRight className="size-4 sm:size-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="h-12 w-full px-10 text-base hover:opacity-90 sm:h-14 sm:flex-1 sm:px-14 sm:text-lg rounded-3xl border border-border landing-button"
            >
              <Link
                href="/#como-funciona"
                className="inline-flex w-full items-center justify-center gap-2"
              >
                Ver como funciona
                <ArrowBigDown className="size-4 sm:size-5" />
              </Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground animate-fade-in">
            <CheckCircle2 className="w-4 h-4 inline mr-2 text-accent" />
            Sem cartão de crédito • 3 dias grátis • Cancele quando quiser
          </p>
        </div>
      </div>
    </section>
  );
}
