import { Button } from "@/components/ui/button";
import Image from "next/image";
import doctorImg from "../../../../public/doctor-hero1.png";

export function Hero() {
  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 pt-6 pb-16 sm:px-8 sm:pt-20 sm:pb-24 lg:px-12 lg:pt-28">
        <main className="flex flex-col items-center gap-10 pt-20 text-center lg:min-h-[60vh] lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:text-left">
          <article className="flex w-full max-w-3xl flex-col items-center justify-center gap-8 text-balance lg:items-start">
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Encontre os melhores profissionais em um único local!
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground md:text-xl text-balance">
              Nós somos uma plataforma para profissionais da saúde com foco em
              agilizar seu atendimento de forma simplificada e organizada.
            </p>
            <Button
              size="lg"
              className="mx-auto bg-emerald-500 font-semibold hover:bg-emerald-400 lg:mx-0"
            >
              Encontre uma clinica
            </Button>
          </article>

          <div className="hidden w-full max-w-[460px] justify-center lg:flex lg:justify-end">
            <Image
              src={doctorImg}
              alt="Foto ilustrativa profissional de saúde"
              width={480}
              height={560}
              className="h-auto w-full max-h-[560px] object-cover"
              sizes="(min-width: 1024px) 460px, 0px"
              quality={100}
              priority
            />
          </div>
        </main>
      </div>
    </section>
  );
}
