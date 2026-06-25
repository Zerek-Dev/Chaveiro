"use client";

import { Phone } from "lucide-react";
import { useSite } from "@/providers/site-provider";
import { buildPhoneUrl } from "@/lib/contact-utils";
import { handleContactConversionClick } from "@/lib/google-ads";

/**
 * Botão flutuante fixo para ligação urgente (canto inferior direito, em todos os ecrãs).
 */
export function FloatingCall() {
  const { site } = useSite();
  return (
    <a
      href={buildPhoneUrl(site.phoneHref)}
      onClick={(event) => handleContactConversionClick(event)}
      aria-label="Ligar agora"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-accent px-5 py-3.5 font-bold text-accent-foreground shadow-lg ring-1 ring-accent/40 transition-transform hover:scale-105"
    >
      <Phone className="size-5" />
      Ligar 24h
    </a>
  );
}
