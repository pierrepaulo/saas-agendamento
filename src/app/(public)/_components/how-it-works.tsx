import { Container } from "@/components/ui/container";
import { CalendarDays, Link2, SlidersHorizontal } from "lucide-react";

const STEPS = [
  {
    title: "Configure seus serviços",
    description:
      "Adicione os serviços que oferece, duração e valores. Simples e rápido.",
    icon: SlidersHorizontal,
  },
  {
    title: "Defina horários e profissionais",
    description:
      "Configure os horários de atendimento de cada profissional da sua equipe.",
    icon: CalendarDays,
  },
  {
    title: "Compartilhe e receba",
    description:
      "Compartilhe seu link de agendamento e receba reservas 24 horas por dia.",
    icon: Link2,
  },
];

export function HowItWorks() {
  return (
    <section
      id="como-funciona"
      className="scroll-mt-24 bg-background py-16 sm:py-20"
    >
      <Container
        overline="Como funciona"
        title="3 passos para transformar sua clínica"
        subtitle="Configure em minutos e comece a receber agendamentos automaticamente"
      >
        <div className="grid gap-10 lg:grid-cols-3">
          {STEPS.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.title} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="gradient-primary mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-border text-2xl font-bold text-primary-foreground">
                    {index + 1}
                  </div>

                  <div className="w-20 h-20 rounded-2xl bg-card border border-border flex items-center justify-center mb-6 shadow-lg">
                    <Icon className="w-10 h-10 text-primary" />
                  </div>

                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>

                  <p className="text-muted-foreground">{step.description}</p>
                </div>

                {index !== STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-24 left-full w-24 -translate-x-7 border-t-2 border-dashed border-border" />
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
