import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Building2, HeartPulse, Sparkles, Stethoscope } from "lucide-react";

const TARGET_AUDIENCE = [
  {
    title: "Clinicas odontologicas",
    description: "Dentistas, ortodontistas e clinicas de implantes dentarios.",
    icon: HeartPulse,
  },
  {
    title: "Clinicas de estetica",
    description:
      "Esteticas, SPAs, clinicas de harmonizacao e procedimentos esteticos.",
    icon: Sparkles,
  },
  {
    title: "Clinicas medicas",
    description:
      "Consultorios, policlinicas e centros medicos de todas as especialidades.",
    icon: Stethoscope,
  },
  {
    title: "Clinicas pequenas e grandes",
    description:
      "Multiplas unidades com gestao centralizada e relatorios consolidados.",
    icon: Building2,
  },
];

export function TargetAudience() {
  return (
    <section
      id="para-quem"
      className="scroll-mt-24 bg-background py-16 sm:py-20"
    >
      <Container
        overline="Para quem e"
        title="Feito para clinicas que querem escala"
        subtitle="Do consultorio individual a redes com multiplas unidades, a Clinica PRO se adapta ao seu ritmo."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TARGET_AUDIENCE.map((audience) => {
            const Icon = audience.icon;

            return (
              <Card
                key={audience.title}
                className="h-full transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <CardContent className="flex h-full flex-col items-center gap-4 text-center">
                  <div className="gradient-primary flex size-12 items-center justify-center rounded-xl text-primary-foreground">
                    <Icon aria-hidden="true" className="size-6" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-base font-semibold text-foreground">
                      {audience.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {audience.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
