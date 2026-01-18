import Link from "next/link";

const FOOTER_LINKS = [
  {
    title: "Produto",
    links: [
      { label: "Vantagens", href: "#vantagens" },
      { label: "Como funciona", href: "#como-funciona" },
      { label: "Planos", href: "#planos" },
    ],
  },
  {
    title: "Empresa",
    links: [{ label: "Para quem é", href: "#para-quem" }],
  },
  {
    title: "Suporte",
    links: [{ label: "Contato", href: "#contato" }],
  },
  {
    title: "Legal",
    // TODO: substituir por rotas reais quando existirem.
    links: [
      { label: "Termos de uso", href: "#" },
      { label: "Política de privacidade", href: "#" },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-2xl font-semibold text-foreground"
            >
              <span>Clinica</span>
              <span className="text-primary">PRO</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Agendamento inteligente para clínicas e consultórios.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {FOOTER_LINKS.map((group) => (
              <div key={group.title} className="space-y-3">
                <p className="text-sm font-semibold text-foreground">
                  {group.title}
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-sm text-muted-foreground">
          <p>© {currentYear} ClinicaPRO. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
