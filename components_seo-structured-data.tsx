"use client";

import { useEffect } from "react";
import { useSite } from "@/providers/site-provider";
import { buildLocalBusinessJsonLd } from "@/lib/seo";

/**
 * Injeta JSON-LD (Schema.org Locksmith) com dados dinâmicos do Firestore.
 * Ajuda o Google a entender serviço, telefone e zonas de atuação.
 */
export function SeoStructuredData() {
  const { site, isLoading } = useSite();
  useEffect(() => {
    if (isLoading) {
      return;
    }
    const scriptId: string = "locksmith-json-ld";
    const existingScript: HTMLElement | null = document.getElementById(scriptId);
    if (existingScript) {
      existingScript.remove();
    }
    const script: HTMLScriptElement = document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(buildLocalBusinessJsonLd(site));
    document.head.appendChild(script);
    return () => {
      script.remove();
    };
  }, [site, isLoading]);
  return null;
}
