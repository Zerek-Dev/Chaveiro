"use client";

import Image from "next/image";
import { Phone, MessageCircle, Clock, ShieldCheck, MapPin } from "lucide-react";
import { useSite } from "@/providers/site-provider";
import { buildPhoneUrl } from "@/lib/contact-utils";
import { handleContactConversionClick } from "@/lib/google-ads";

export function Hero() {
  const { site } = useSite();
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:gap-12 md:px-6 md:py-20">
        <div className="flex flex-col items-start">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 text-sm font-semibold text-accent ring-1 ring-accent/40">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            Serviço de urgência ativo agora
          </span>
          <h1 className="mt-5 text-pretty text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Chaveiro 24h em {site.city}
          </h1>
          <p className="mt-4 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            Ficou fechado fora de casa? Perdeu as chaves? Resolvemos no momento,
            sem danificar a porta. Aberturas de urgência, cópias de chaves e
            fechaduras de segurança.
          </p>
          <div className="mt-7 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={buildPhoneUrl(site.phoneHref)}
              onClick={(event) => handleContactConversionClick(event)}
              className="flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3.5 text-base font-bold text-accent-foreground shadow-sm transition-transform hover:scale-[1.02]"
            >
              <Phone className="size-5" />
              Ligar agora
            </a>
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => handleContactConversionClick(event, true)}
            >
              <MessageCircle className="size-5" />
              WhatsApp
            </a>
          </div>
          <dl className="mt-9 grid w-full grid-cols-3 gap-4 border-t border-border/60 pt-6">
            <div className="flex flex-col gap-1">
              <Clock className="size-5 text-accent" />
              <dt className="text-xl font-bold text-foreground">~30 min</dt>
              <dd className="text-xs text-muted-foreground">Tempo médio de chegada</dd>
            </div>
            <div className="flex flex-col gap-1">
              <ShieldCheck className="size-5 text-accent" />
              <dt className="text-xl font-bold text-foreground">+10 anos</dt>
              <dd className="text-xs text-muted-foreground">De experiência</dd>
            </div>
            <div className="flex flex-col gap-1">
              <MapPin className="size-5 text-accent" />
              <dt className="text-xl font-bold text-foreground">24/7</dt>
              <dd className="text-xs text-muted-foreground">Todos os dias do ano</dd>
            </div>
          </dl>
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-border shadow-xl">
            <Image
              src="/images/chaveiro-hero.png"
              alt="Chaveiro profissional a instalar uma fechadura de segurança numa porta"
              width={720}
              height={820}
              priority
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-4 hidden rounded-xl border border-border bg-card px-5 py-4 shadow-lg sm:block">
            <p className="text-sm font-semibold text-foreground">Sem deslocação?</p>
            <p className="text-sm text-muted-foreground">Orçamento por telefone, sem surpresas.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
