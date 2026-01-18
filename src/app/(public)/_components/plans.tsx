import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { subscriptionPlans } from "@/utils/plans";
import { Check } from "lucide-react";
import Link from "next/link";

const RECOMMENDED_PLAN_ID = "PROFESSIONAL";
// TODO: atualizar quando existir rota de cadastro/onboarding.
const PLAN_CTA_HREF = "/#contato";

export function Plans() {
  return (
    <section id="planos" className="scroll-mt-24 bg-background py-16 sm:py-20">
      <Container
        overline="Planos"
        title="Planos para cada fase da sua clinica"
        subtitle="Escolha o plano ideal para o seu porte e comece a organizar sua agenda."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {subscriptionPlans.map((plan) => {
            const isRecommended = plan.id === RECOMMENDED_PLAN_ID;
            const audience =
              plan.id === "BASIC"
                ? "Clinicas menores ou em inicio de operacao."
                : "Clinicas maiores, com alto volume e multiplas unidades.";

            return (
              <Card
                key={plan.id}
                className={cn(
                  "relative h-full",
                  isRecommended && "border-primary/40 shadow-lg",
                )}
              >
                {isRecommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
                    Mais popular
                  </div>
                )}

                <CardHeader className="space-y-2">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground line-through">
                      {plan.oldPrice}
                    </p>
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-semibold text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        /mes
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Sem fidelidade
                    </p>
                  </div>

                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="mt-0.5 size-4 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="rounded-lg border border-dashed border-border bg-muted/50 px-4 py-3 text-sm text-muted-foreground">
                    Indicado para: {audience}
                  </div>
                </CardContent>

                <CardFooter className="mt-auto">
                  <Button asChild className="w-full">
                    <Link href={PLAN_CTA_HREF}>Falar com a equipe</Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
