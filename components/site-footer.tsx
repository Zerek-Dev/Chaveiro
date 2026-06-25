"use client";

import { KeyRound, Phone, MessageCircle } from "lucide-react";
import { useSite } from "@/providers/site-provider";
import { buildPhoneUrl } from "@/lib/contact-utils";
import { handleContactConversionClick } from "@/lib/google-ads";
import {
  developerContact,
  buildDeveloperMailto,
  buildDeveloperWhatsAppUrl,
} from "@/lib/developer";

/**
 * Rodapé do site com contacto do negócio e crédito do programador.
 */
export function SiteFooter() {
  const { site } = useSite();
  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-2 lg:grid-cols-4 md:px-6">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <KeyRound className="size-5" />
            </span>
            <span className="text-lg font-bold tracking-tight text-foreground">
              {site.name}
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-foreground/75">
            {site.tagline} em {site.city}. Aberturas, cópias de chaves,
            fechaduras e chaves de automóvel.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">Serviços</h3>
          <ul className="mt-3 flex flex-col gap-2 text-sm text-foreground/75">
            <li>Aberturas de urgência 24h</li>
            <li>Cópia de chaves</li>
            <li>Fechaduras e segurança</li>
            <li>Chaves de automóvel</li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">Contacto</h3>
          <a
            href={buildPhoneUrl(site.phoneHref)}
            onClick={(event) => handleContactConversionClick(event)}
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-colors hover:text-accent"
          >
            <Phone className="size-4" />
            {site.phoneDisplay}
          </a>
          <p className="mt-2 text-sm text-foreground/75">
            {site.physicalAddress || site.serviceZone}
          </p>
          {site.email && (
            <a
              href={`mailto:${site.email}`}
              className="mt-1 block text-sm text-foreground/75 transition-colors hover:text-accent"
            >
              {site.email}
            </a>
          )}
          {site.instagramUrl && (
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-sm text-foreground/75 transition-colors hover:text-accent"
            >
              Instagram
            </a>
          )}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">Programador</h3>
          <p className="mt-3 text-sm leading-relaxed text-foreground/75">
            {developerContact.tagline}
          </p>
          <p className="mt-3 text-sm text-foreground/75">
            <span className="font-medium text-foreground">E-mail: </span>
            <a
              href={buildDeveloperMailto()}
              className="transition-colors hover:text-accent"
            >
              {developerContact.email}
            </a>
          </p>
          <p className="mt-2 text-sm text-foreground/75">
            <span className="font-medium text-foreground">Contacto: </span>
            <a
              href={buildDeveloperWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 transition-colors hover:text-accent"
            >
              <MessageCircle className="size-3.5" />
              {developerContact.phone}
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-foreground/60 md:flex-row md:px-6">
          <p>
            © {new Date().getFullYear()} {site.name}. Todos os direitos reservados.
          </p>
          <p>Chaveiro profissional em {site.city}, Portugal.</p>
          <p>
            Desenvolvido por{" "}
            <a
              href={buildDeveloperMailto()}
              className="font-medium text-foreground transition-colors hover:text-accent"
            >
              {developerContact.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
