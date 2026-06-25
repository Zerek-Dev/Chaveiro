"use client";

import { DoorOpen, KeyRound, Lock, Car, ArrowRight } from "lucide-react";
import { useSite } from "@/providers/site-provider";
import { buildPhoneUrl } from "@/lib/contact-utils";
import { handleContactConversionClick } from "@/lib/google-ads";

const services = [
  {
    icon: DoorOpen,
    title: "Aberturas de urgência 24h",
    description:
      "Portas trancadas, chaves partidas na fechadura ou perdidas. Abrimos sem danos sempre que possível, a qualquer hora.",
    badge: "Mais pedido",
  },
  {
    icon: KeyRound,
    title: "Cópia de chaves",
    description:
      "Duplicação de chaves de casa, prédio, caixa do correio e chaves de segurança. Rápido e com qualidade garantida.",
  },
  {
    icon: Lock,
    title: "Fechaduras e segurança",
    description:
      "Instalação e substituição de fechaduras, portas blindadas, cilindros de segurança e cofres.",
  },
  {
    icon: Car,
    title: "Chaves de automóvel",
    description:
      "Cópia de chaves codificadas, comandos e transponders. Reprogramação para a maioria das marcas.",
  },
];

export function Services() {
  const { site } = useSite();
  return (
    <section id="servicos" className="bg-secondary/50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            Os nossos serviços
          </span>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Tudo o que precisa, de chaves a segurança
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Um chaveiro de confiança para qualquer situação em {site.city}, seja
            uma urgência ou para reforçar a segurança da sua casa ou negócio.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              {service.badge && (
                <span className="absolute right-4 top-4 rounded-full bg-accent px-2.5 py-0.5 text-xs font-semibold text-accent-foreground">
                  {service.badge}
                </span>
              )}
              <span className="flex size-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <service.icon className="size-6" />
              </span>
              <h3 className="mt-4 text-lg font-bold text-foreground">
                {service.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <a
                href={buildPhoneUrl(site.phoneHref)}
                onClick={(event) => handleContactConversionClick(event)}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground transition-colors hover:text-accent"
              >
                Pedir este serviço
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
