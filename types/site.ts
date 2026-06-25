/** Configuração persistida em Firestore (documento site/config). */
export interface SiteConfig {
  whatsappNumber: string;
  whatsappMessage: string;
  businessName: string;
  phoneNumber: string;
  email: string;
  physicalAddress: string;
  hours: string;
  instagramUrl: string;
  carouselImages: string[];
  updatedAt?: unknown;
}
/** Cidade na coleção cities. */
export interface City {
  id: string;
  name: string;
  order: number;
  active: boolean;
}

/** Bairro na coleção neighborhoods. */
export interface Neighborhood {
  id: string;
  cityId: string;
  name: string;
  order: number;
  active: boolean;
}

/** Zona de atuação com bairros agrupados (visão do site). */
export interface ServiceArea {
  id: string;
  name: string;
  neighborhoods: string[];
}

/** Modelo de visualização consumido pelos componentes React. */
export interface SiteViewModel {
  name: string;
  tagline: string;
  city: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsappHref: string;
  whatsappMessage: string;
  whatsappUrl: string;
  email: string;
  physicalAddress: string;
  serviceZone: string;
  hours: string;
  instagramUrl: string;
  carouselImages: string[];
  serviceAreas: ServiceArea[];
  coverageLabels: string[];
}
