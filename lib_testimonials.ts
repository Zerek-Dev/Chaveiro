import { testimonialTemplates, type Testimonial } from "@/lib/content/testimonials";
import { formatCityList } from "@/lib/site-defaults";
import type { ServiceArea } from "@/types/site";

/**
 * Escolhe locais de atendimento reais para os depoimentos, priorizando variedade entre cidades.
 * @param areas - Zonas de atuação activas (cidades e bairros do painel).
 * @param count - Quantidade de locais necessários.
 * @returns Rótulos no formato "Bairro, Cidade" ou só o nome da cidade.
 */
function pickTestimonialLocations(areas: ServiceArea[], count: number): string[] {
  const picked: string[] = [];
  const usedLabels: Set<string> = new Set<string>();
  areas.forEach((area) => {
    if (picked.length >= count) {
      return;
    }
    const primaryLabel: string =
      area.neighborhoods.length > 0
        ? `${area.neighborhoods[0]}, ${area.name}`
        : area.name;
    if (!usedLabels.has(primaryLabel)) {
      picked.push(primaryLabel);
      usedLabels.add(primaryLabel);
    }
  });
  areas.forEach((area) => {
    if (picked.length >= count) {
      return;
    }
    area.neighborhoods.slice(1).forEach((neighborhood) => {
      if (picked.length >= count) {
        return;
      }
      const label: string = `${neighborhood}, ${area.name}`;
      if (!usedLabels.has(label)) {
        picked.push(label);
        usedLabels.add(label);
      }
    });
  });
  let fallbackIndex: number = 0;
  while (picked.length < count && areas.length > 0) {
    const area: ServiceArea = areas[fallbackIndex % areas.length];
    const label: string = area.name;
    if (!usedLabels.has(label)) {
      picked.push(label);
      usedLabels.add(label);
    }
    fallbackIndex += 1;
    if (fallbackIndex > areas.length * 2) {
      break;
    }
  }
  return picked.slice(0, count);
}

/**
 * Gera o título da secção de depoimentos com base nas cidades activas.
 * @param areas - Zonas de atuação do Firestore.
 * @returns Frase de destaque para o cabeçalho da secção.
 */
export function buildTestimonialsHeading(areas: ServiceArea[]): string {
  const cityNames: string[] = areas.map((area) => area.name);
  if (cityNames.length === 0) {
    return "Clientes satisfeitos em Lisboa e arredores";
  }
  return `Clientes satisfeitos em ${formatCityList(cityNames)}`;
}

/**
 * Combina textos fixos dos depoimentos com locais reais da zona de atuação.
 * @param areas - Cidades e bairros configurados no painel admin.
 * @returns Lista de depoimentos pronta para renderização.
 */
export function buildTestimonials(areas: ServiceArea[]): Testimonial[] {
  const locations: string[] = pickTestimonialLocations(
    areas,
    testimonialTemplates.length
  );
  const fallbackLocation: string =
    areas.length > 0 ? areas[0].name : "Lisboa";
  return testimonialTemplates.map((template, index) => ({
    name: template.name,
    text: template.text,
    location: locations[index] ?? fallbackLocation,
  }));
}
