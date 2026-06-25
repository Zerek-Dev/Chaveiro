import { defaultSiteConfig } from "@/lib/firebase-config";
import {
  buildDefaultServiceAreas,
  formatCityList,
} from "@/lib/site-defaults";
import type { ServiceArea, SiteViewModel } from "@/types/site";

/** URL pública do site (Firebase Hosting). SUBSTITUIR pelo domínio final. */
export const SITE_URL: string = "https://your-domain.example";

/** Palavras-chave base para buscas de urgência (chaveiro). */
export const BASE_SEO_KEYWORDS: readonly string[] = [
  "chaveiro 24 horas",
  "chaveiro urgente",
  "chaveiro 24h",
  "abertura de porta",
  "abertura de porta urgente",
  "porta trancada",
  "ficou trancado fora de casa",
  "chave perdida",
  "cópia de chaves",
  "fechaduras",
  "chaveiro perto de mim",
  "chaves automóvel",
  "abertura sem danos",
  "chaveiro de urgência",
] as const;

/**
 * Gera palavras-chave locais a partir das cidades e bairros de atuação.
 * @param areas - Zonas configuradas no painel admin.
 * @returns Lista única de termos para meta keywords e conteúdo.
 */
export function buildLocalSeoKeywords(areas: ServiceArea[]): string[] {
  const keywords: string[] = [...BASE_SEO_KEYWORDS];
  areas.forEach((area) => {
    keywords.push(`chaveiro ${area.name}`);
    keywords.push(`chaveiro 24h ${area.name}`);
    keywords.push(`abertura de porta ${area.name}`);
    area.neighborhoods.forEach((neighborhood) => {
      keywords.push(`chaveiro ${neighborhood}`);
      keywords.push(`chaveiro ${neighborhood} ${area.name}`);
    });
  });
  return Array.from(new Set(keywords));
}

/**
 * Monta a meta description optimizada para pesquisa local.
 * @param areas - Zonas de atuação activas.
 * @returns Texto para motores de busca (até ~160 caracteres recomendado).
 */
export function buildSeoDescription(areas: ServiceArea[]): string {
  const cityLabel: string = formatCityList(areas.map((area) => area.name));
  return (
    `Chaveiro 24 horas em ${cityLabel}. Abertura de porta urgente, cópia de chaves, ` +
    `fechaduras e chaves de automóvel. Resposta rápida — ligue ou envie WhatsApp já!`
  );
}

/**
 * Monta o título da página para resultados do Google.
 * @param businessName - Nome do negócio.
 * @param areas - Zonas de atuação activas.
 * @returns Título SEO com palavras-chave principais.
 */
export function buildSeoTitle(businessName: string, areas: ServiceArea[]): string {
  const cityLabel: string = formatCityList(areas.map((area) => area.name));
  return `${businessName} | Chaveiro 24h em ${cityLabel} — Abertura Urgente`;
}

/**
 * Constrói dados estruturados Schema.org (Locksmith) para o Google.
 * @param site - Modelo de visualização com contacto e zonas de atuação.
 * @returns Objeto JSON-LD pronto para serialização.
 */
export function buildLocalBusinessJsonLd(site: SiteViewModel): Record<string, unknown> {
  const areaServed: Record<string, unknown>[] = site.serviceAreas.map((area) => ({
    "@type": "City",
    name: area.name,
    ...(area.neighborhoods.length > 0 && {
      containsPlace: area.neighborhoods.map((neighborhood) => ({
        "@type": "Place",
        name: neighborhood,
      })),
    }),
  }));
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Locksmith",
    name: site.name,
    description: buildSeoDescription(site.serviceAreas),
    url: SITE_URL,
    telephone: site.phoneHref,
    image: `${SITE_URL}/images/chaveiro-hero.png`,
    priceRange: "€€",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    areaServed,
    knowsAbout: [
      "Abertura de portas de urgência",
      "Cópia de chaves",
      "Instalação de fechaduras",
      "Chaves de automóvel",
    ],
  };
  if (site.physicalAddress) {
    jsonLd.address = {
      "@type": "PostalAddress",
      streetAddress: site.physicalAddress,
      addressCountry: "PT",
    };
  }
  if (site.email) {
    jsonLd.email = site.email;
  }
  return jsonLd;
}

/** Áreas padrão usadas na metadata estática gerada no build. */
const defaultAreas: ServiceArea[] = buildDefaultServiceAreas();

/** Metadata SEO estática (build time) com fallback das zonas padrão. */
export const staticSeoMetadata = {
  title: buildSeoTitle(defaultSiteConfig.businessName, defaultAreas),
  description: buildSeoDescription(defaultAreas),
  keywords: buildLocalSeoKeywords(defaultAreas),
} as const;
