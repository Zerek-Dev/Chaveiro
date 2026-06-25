import {
  defaultSiteConfig,
  defaultCarouselImages,
  defaultServiceAreas,
} from "@/lib/firebase-config";
import { buildWhatsAppUrl } from "@/lib/contact-utils";
import type { ServiceArea, SiteConfig, SiteViewModel } from "@/types/site";

/**
 * Converte áreas padrão do firebase-config em ServiceArea[].
 * @returns Lista de áreas com id sintético para fallback offline.
 */
export function buildDefaultServiceAreas(): ServiceArea[] {
  return defaultServiceAreas.map((area, index) => ({
    id: `default-${index}`,
    name: area.name,
    neighborhoods: [...area.neighborhoods],
  }));
}

/**
 * Formata lista de cidades para exibição (ex.: "Lisboa, Sintra e Cascais").
 * @param cityNames - Nomes das cidades activas.
 * @returns Texto com conjunção "e" antes da última cidade.
 */
export function formatCityList(cityNames: string[]): string {
  if (cityNames.length === 0) {
    return "Lisboa e região";
  }
  if (cityNames.length === 1) {
    return `${cityNames[0]} e arredores`;
  }
  if (cityNames.length === 2) {
    return `${cityNames[0]} e ${cityNames[1]}`;
  }
  const lastCity: string = cityNames[cityNames.length - 1];
  const otherCities: string = cityNames.slice(0, -1).join(", ");
  return `${otherCities} e ${lastCity}`;
}

/**
 * Gera o título principal da secção de zona de atuação.
 * @param areas - Zonas de atuação com cidades e bairros.
 * @returns Frase de destaque que inclui todas as cidades activas.
 */
export function buildCoverageHeading(areas: ServiceArea[]): string {
  const cityNames: string[] = areas.map((area) => area.name);
  if (cityNames.length === 0) {
    return "Deslocamo-nos até à sua morada";
  }
  if (cityNames.length === 1) {
    return `Servimos ${cityNames[0]} e arredores`;
  }
  return `Servimos ${formatCityList(cityNames)}`;
}

/**
 * Gera texto descritivo da zona de atuação a partir das cidades activas.
 * @param areas - Zonas de atuação com cidades e bairros.
 * @returns Frase complementar sem repetir o título quando há várias cidades.
 */
export function buildCoverageDescription(areas: ServiceArea[]): string {
  const suffix: string =
    "Não tem a certeza se chegamos à sua morada? Ligue e confirmamos de imediato.";
  const cityNames: string[] = areas.map((area) => area.name);
  if (cityNames.length === 0) {
    return `Trabalhamos em Lisboa, Grande Lisboa e arredores. ${suffix}`;
  }
  if (cityNames.length === 1) {
    return suffix;
  }
  return `Veja ao lado as cidades e bairros que cobrimos. ${suffix}`;
}

/**
 * Gera rótulos planos para a secção de cobertura (cidades + bairros).
 * @param areas - Zonas de atuação activas.
 * @returns Lista única de nomes para exibição em chips.
 */
export function buildCoverageLabels(areas: ServiceArea[]): string[] {
  const labels: string[] = [];
  areas.forEach((area) => {
    labels.push(area.name);
    area.neighborhoods.forEach((neighborhood) => {
      labels.push(neighborhood);
    });
  });
  return labels;
}

/**
 * Configuração padrão quando Firestore ainda não tem documento site/config.
 * @returns Objeto SiteConfig com valores de fallback.
 */
export function buildDefaultSiteConfig(): SiteConfig {
  return {
    whatsappNumber: defaultSiteConfig.whatsappNumber,
    whatsappMessage: defaultSiteConfig.whatsappMessage,
    businessName: defaultSiteConfig.businessName,
    phoneNumber: defaultSiteConfig.phoneNumber,
    email: defaultSiteConfig.email,
    physicalAddress: defaultSiteConfig.physicalAddress,
    hours: defaultSiteConfig.hours,
    instagramUrl: defaultSiteConfig.instagramUrl,
    carouselImages: [...defaultCarouselImages],
  };
}

/**
 * Constrói o modelo de visualização do site a partir da config e áreas.
 * @param config - Configuração do negócio (Firestore ou fallback).
 * @param serviceAreas - Cidades e bairros ativos.
 * @returns SiteViewModel pronto para os componentes React.
 */
export function buildSiteViewModel(
  config: SiteConfig,
  serviceAreas: ServiceArea[]
): SiteViewModel {
  const cityNames: string[] = serviceAreas.map((area) => area.name);
  const cityLabel: string = formatCityList(cityNames);
  return {
    name: config.businessName,
    tagline: "Chaveiro 24 horas",
    city: cityLabel,
    phoneDisplay: config.phoneNumber,
    phoneHref: config.phoneNumber.replace(/\s/g, ""),
    whatsappHref: config.whatsappNumber.replace(/^\+/, "").replace(/\s/g, ""),
    whatsappMessage: config.whatsappMessage,
    whatsappUrl: buildWhatsAppUrl(config.whatsappNumber, config.whatsappMessage),
    email: config.email,
    physicalAddress: config.physicalAddress,
    serviceZone: `Deslocação em toda a zona — ${cityLabel}`,
    hours: config.hours,
    instagramUrl: config.instagramUrl,
    carouselImages:
      config.carouselImages.length > 0
        ? config.carouselImages
        : [...defaultCarouselImages],
    serviceAreas,
    coverageLabels: buildCoverageLabels(serviceAreas),
  };
}
