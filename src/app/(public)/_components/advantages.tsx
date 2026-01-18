import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { BellRing, CalendarCheck, Clock3, Phone } from "lucide-react";

const ADVANTAGES = [
  {
    title: "Menos ligações",
    description:
      'Chega de "tem horário disponível?". Seus pacientes agendam online 24h por dia.',
    icon: Phone,
    iconClassName: "bg-primary/10 text-primary",
  },
  {
    title: "Agenda organizada",
    description:
      "Organize por profissional, sala ou unidade. Visualize tudo em um só lugar.",
    icon: CalendarCheck,
    iconClassName: "bg-accent/15 text-accent",
  },
  {
    title: "Menos faltas",
    description:
      "Lembretes automáticos por WhatsApp e SMS. Reduza cancelamentos em até 70%.",
    icon: BellRing,
    iconClassName: "bg-success/15 text-success",
  },
  {
    title: "Tempo economizado",
    description:
      "Automatize tarefas repetitivas e ganhe horas preciosas por semana.",
    icon: Clock3,
    iconClassName: "bg-warning/15 text-warning",
  },
];

export function Advantages() {
  return (
    <section
      id="vantagens"
      className="scroll-mt-24 bg-background py-16 sm:py-20"
    >
      <Container
        overline="Vantagens"
        title="Resultados que você sente no dia a dia"
        subtitle={
          "Simplifique a gestão da sua clínica e foque no que realmente importa: seus pacientes"
        }
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
          {ADVANTAGES.map((advantage) => {
            const Icon = advantage.icon;

            return (
              <Card
                key={advantage.title}
                className="gap-0 border-border/70 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <CardContent className="flex h-full flex-col items-start gap-4 p-6 text-left">
                  <div
                    className={`flex size-12 items-center justify-center rounded-2xl ${advantage.iconClassName}`}
                  >
                    <Icon aria-hidden="true" className="size-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-semibold text-foreground">
                      {advantage.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {advantage.description}
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
