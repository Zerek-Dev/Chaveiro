"use client";

import { Phone, MessageCircle, Clock, Mail, MapPin, Truck } from "lucide-react";
import { useSite } from "@/providers/site-provider";
import { buildPhoneUrl } from "@/lib/contact-utils";
import { handleContactConversionClick } from "@/lib/google-ads";

/**
 * Secção de contacto com telefone, WhatsApp e dados editáveis no painel admin.
 */
export function ContactCta() {
  const { site } = useSite();
  return (
    <section id="contacto" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="overflow-hidden rounded-2xl bg-primary text-primary-foreground">
          <div className="grid gap-8 p-8 md:grid-cols-2 md:items-center md:p-12">
            <div>
              <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
                Precisa de um chaveiro agora?
              </h2>
              <p className="mt-3 text-pretty leading-relaxed text-primary-foreground/70">
                Ligue já e fale diretamente com um técnico. Resposta imediata,
                24 horas por dia, em {site.city}.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href={buildPhoneUrl(site.phoneHref)}
                  onClick={(event) => handleContactConversionClick(event)}
                  className="flex items-center justify-center gap-2 rounded-md bg-accent px-6 py-3.5 text-base font-bold text-accent-foreground transition-transform hover:scale-[1.02]"
                >
                  <Phone className="size-5" />
                  {site.phoneDisplay}
                </a>
                <a
                  href={site.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => handleContactConversionClick(event, true)}
                  className="flex items-center justify-center gap-2 rounded-md border border-primary-foreground/25 px-6 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                >
                  <MessageCircle className="size-5" />
                  Enviar WhatsApp
                </a>
              </div>
            </div>
            <div className="grid gap-4 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-6">
              <div className="flex items-start gap-3">
                <Clock className="mt-0.5 size-5 shrink-0 text-accent" />
                <div>
                  <span className="block text-sm font-semibold">Horário</span>
                  <span className="text-sm text-primary-foreground/70">{site.hours}</span>
                </div>
              </div>
              {site.physicalAddress && (
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-accent" />
                  <div>
                    <span className="block text-sm font-semibold">Morada</span>
                    <span className="text-sm text-primary-foreground/70">
                      {site.physicalAddress}
                    </span>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <Truck className="mt-0.5 size-5 shrink-0 text-accent" />
                <div>
                  <span className="block text-sm font-semibold">Deslocação</span>
                  <span className="text-sm text-primary-foreground/70">{site.serviceZone}</span>
                </div>
              </div>
              {site.email && (
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-5 shrink-0 text-accent" />
                  <div>
                    <span className="block text-sm font-semibold">E-mail</span>
                    <a
                      href={`mailto:${site.email}`}
                      className="text-sm text-primary-foreground/70 underline-offset-2 transition-colors hover:text-accent hover:underline"
                    >
                      {site.email}
                    </a>
                  </div>
                </div>
              )}
              {site.instagramUrl && (
                <div className="flex items-start gap-3">
                  <InstagramIcon className="mt-0.5 size-5 shrink-0 text-accent" />
                  <div>
                    <span className="block text-sm font-semibold">Instagram</span>
                    <a
                      href={site.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary-foreground/70 underline-offset-2 transition-colors hover:text-accent hover:underline"
                    >
                      {site.instagramUrl.replace(/^https?:\/\/(www\.)?/, "")}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Ícone SVG do Instagram (lucide-react não expõe este símbolo).
 * @param className - Classes Tailwind para tamanho e cor.
 */
function InstagramIcon({ className }: { className?: string }): React.JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
