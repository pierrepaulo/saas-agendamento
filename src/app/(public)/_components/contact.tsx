"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, MessageCircle } from "lucide-react";
import { type ChangeEvent, type FormEvent, useState } from "react";

const SUPPORT_EMAIL = "suporte@clinicapro.com";
const SUPPORT_WHATSAPP = "https://wa.me/5511999990000";

const CONTACT_ITEMS = [
  {
    title: "WhatsApp",
    value: "+55 11 99999-0000",
    href: SUPPORT_WHATSAPP,
    icon: MessageCircle,
  },
  {
    title: "Email",
    value: SUPPORT_EMAIL,
    href: `mailto:${SUPPORT_EMAIL}`,
    icon: Mail,
  },
  {
    title: "Horário de atendimento",
    value: "Seg a sex, 9h-18h (BRT)",
    icon: Clock,
  },
];

type FormValues = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

function validate(values: FormValues) {
  const errors: FormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Informe seu nome.";
  }

  if (!values.email.trim()) {
    errors.email = "Informe seu email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Email inválido.";
  }

  if (!values.message.trim()) {
    errors.message = "Escreva sua mensagem.";
  }

  return errors;
}

export function Contact() {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const field = event.target.name as keyof FormValues;

    setValues((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));

    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }

    setSubmitted(false);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
  }

  return (
    <section id="contato" className="scroll-mt-24 bg-background py-16 sm:py-20">
      <Container
        overline="Contato"
        title="Vamos conversar?"
        subtitle="Tire suas dúvidas ou solicite uma demonstração personalizada. Nossa equipe está pronta para ajudar."
      >
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <div className="space-y-4">
              {CONTACT_ITEMS.map((item) => {
                const Icon = item.icon;
                const content = (
                  <div className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card/80 p-4 shadow-sm">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-foreground">
                        {item.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );

                if (item.href) {
                  return (
                    <a
                      key={item.title}
                      href={item.href}
                      className="block transition-transform hover:-translate-y-0.5"
                      rel={
                        item.href.startsWith("http") ? "noreferrer" : undefined
                      }
                    >
                      {content}
                    </a>
                  );
                }

                return <div key={item.title}>{content}</div>;
              })}
            </div>
          </div>

          <Card className="border-border/60 bg-card/90 shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-foreground">
                  Envie sua mensagem
                </h3>
                <p className="text-sm text-muted-foreground">
                  Preencha o formulário e retornaremos em breve.
                </p>
              </div>

              <form
                className="mt-6 space-y-4"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-sm font-medium">
                    Nome
                  </label>
                  <Input
                    id="contact-name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                      errors.name ? "contact-name-error" : undefined
                    }
                  />
                  {errors.name ? (
                    <p
                      id="contact-name-error"
                      role="alert"
                      className="text-xs text-destructive"
                    >
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-medium"
                  >
                    Email
                  </label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? "contact-email-error" : undefined
                    }
                  />
                  {errors.email ? (
                    <p
                      id="contact-email-error"
                      role="alert"
                      className="text-xs text-destructive"
                    >
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-medium"
                  >
                    Mensagem
                  </label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    value={values.message}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={
                      errors.message ? "contact-message-error" : undefined
                    }
                  />
                  {errors.message ? (
                    <p
                      id="contact-message-error"
                      role="alert"
                      className="text-xs text-destructive"
                    >
                      {errors.message}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Button
                    type="submit"
                    size="lg"
                    className="rounded-3xl gradient-primary text-primary-foreground hover:opacity-90 landing-button"
                  >
                    Enviar mensagem
                  </Button>
                  {submitted ? (
                    <p role="status" className="text-sm text-primary">
                      Mensagem enviada.
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Responderemos em até 1 dia útil.
                    </p>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
}
