import { buildWhatsAppUrl } from "@/lib/contact-utils";

/** Dados de contacto do desenvolvedor do site. */
export const developerContact = {
  name: "Alleph",
  email: "allephn@hotmail.com.br",
  phone: "+5521975575694",
  tagline: "Desenvolvo o seu site profissional para captar mais clientes.",
  whatsappMessage: "Olá! Gostaria de um orçamento para um site profissional.",
} as const;

/**
 * Gera o link mailto do desenvolvedor com assunto pré-definido.
 * @returns URL mailto completa.
 */
export function buildDeveloperMailto(): string {
  const subject: string = encodeURIComponent("Orçamento de site profissional");
  return `mailto:${developerContact.email}?subject=${subject}`;
}

/**
 * Gera o link WhatsApp do desenvolvedor com mensagem inicial.
 * @returns URL wa.me com texto pré-preenchido.
 */
export function buildDeveloperWhatsAppUrl(): string {
  return buildWhatsAppUrl(
    developerContact.phone,
    developerContact.whatsappMessage
  );
}
