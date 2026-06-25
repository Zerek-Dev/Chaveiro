"use client";

import { MapPin, Phone, MessageCircle } from "lucide-react";
import { useSite } from "@/providers/site-provider";
import { buildCoverageDescription, buildCoverageHeading } from "@/lib/site-defaults";
import { buildPhoneUrl } from "@/lib/contact-utils";
import { handleContactConversionClick } from "@/lib/google-ads";
import type { ServiceArea } from "@/types/site";

/**
 * Formata a lista de bairros para exibição inline (ex.: "Leblon · Copacabana · Ipanema").
 * @param neighborhoods - Nomes dos bairros activos da cidade.
 * @returns Texto formatado ou mensagem quando não há bairros específicos.
 */
function formatNeighborhoodList(neighborhoods: string[]): string {
  if (neighborhoods.length === 0) {
    return "Toda a cidade e arredores";
  }
  return neighborhoods.join(" · ");
}

/**
 * Cartão visual de uma cidade com os bairros cobertos.
 * @param area - Cidade e bairros agrupados vindos do Firestore.
 */
function ServiceAreaCard({ area }: { area: ServiceArea }) {
  return (
    <article className="rounded-xl border border-border/60 bg-secondary/80 p-5 transition-colors hover:border-accent/30">
      <div className="flex items-center gap-2.5">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-accent">
          <MapPin className="size-4" />
        </span>
        <h3 className="text-lg font-bold tracking-tight text-foreground">{area.name}</h3>
      </div>
      {area.neighborhoods.length > 0 ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {area.neighborhoods.map((neighborhood) => (
            <span
              key={`${area.id}-${neighborhood}`}
              className="rounded-full border border-border/50 bg-background px-3 py-1 text-xs font-medium text-foreground/85"
            >
              {neighborhood}
            </span>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-sm text-foreground/65">
          {formatNeighborhoodList(area.neighborhoods)}
        </p>
      )}
    </article>
  );
}

/**
 * Secção pública da zona de atuação com cidades, bairros e contacto visível no computador.
 */
export function Coverage() {
  const { site } = useSite();
  const areas: ServiceArea[] =
    site.serviceAreas.length > 0
      ? site.serviceAreas
      : [
          { id: "fallback-lisboa", name: "Lisboa", neighborhoods: ["Benfica", "Alvalade"] },
          { id: "fallback-sintra", name: "Sintra", neighborhoods: ["Agualva", "Mem Martins"] },
        ];
  const heading: string = buildCoverageHeading(areas);
  const description: string = buildCoverageDescription(areas);
  return (
    <section id="zona" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="rounded-2xl border border-border bg-card p-8 md:p-12">
          <div className="grid gap-10 lg:grid-cols-5 lg:items-start">
            <div className="lg:col-span-2">
              <span className="text-sm font-semibold uppercase tracking-wide text-accent">
                Zona de atuação
              </span>
              <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {heading}
              </h2>
              <p className="mt-3 text-pretty leading-relaxed text-foreground/75">
                {description}
              </p>
              <p className="mt-4 text-sm text-foreground/60">
                Consulte a sua cidade e veja os bairros que cobrimos.
              </p>
              <div className="mt-6 hidden flex-col gap-3 md:flex">
                <p className="text-sm font-semibold text-foreground">
                  Precisa de confirmação ou urgência?
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={buildPhoneUrl(site.phoneHref)}
                    onClick={(event) => handleContactConversionClick(event)}
                    className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-base font-bold text-accent-foreground transition-transform hover:scale-[1.02]"
                  >
                    <Phone className="size-5" />
                    {site.phoneDisplay}
                  </a>
                  <a
                    href={site.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => handleContactConversionClick(event, true)}
                    className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-3 text-base font-semibold text-foreground transition-colors hover:bg-secondary"
                  >
                    <MessageCircle className="size-5" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-3">
              {areas.map((area) => (
                <ServiceAreaCard key={area.id} area={area} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
