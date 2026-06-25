/**
 * Remove espaços e caracteres inválidos de um número telefónico E.164.
 * @param phone - Número no formato E.164 (ex.: +351912345678).
 * @returns Número limpo para uso em links tel:.
 */
export function normalizePhoneHref(phone: string): string {
  return phone.replace(/\s/g, "");
}

/**
 * Extrai dígitos do WhatsApp sem o prefixo + para links wa.me.
 * @param whatsappNumber - Número WhatsApp em E.164.
 * @returns Apenas dígitos (ex.: 351912345678).
 */
export function normalizeWhatsAppHref(whatsappNumber: string): string {
  return whatsappNumber.replace(/^\+/, "").replace(/\s/g, "");
}

/**
 * Monta URL do WhatsApp com mensagem pré-preenchida.
 * @param whatsappNumber - Número em E.164.
 * @param message - Texto inicial da conversa.
 * @returns URL completa https://wa.me/...
 */
export function buildWhatsAppUrl(whatsappNumber: string, message: string): string {
  const digits: string = normalizeWhatsAppHref(whatsappNumber);
  const encodedMessage: string = encodeURIComponent(message);
  return `https://wa.me/${digits}?text=${encodedMessage}`;
}

/**
 * Monta URL tel: para ligação direta.
 * @param phoneNumber - Número em E.164.
 * @returns URL tel:+...
 */
export function buildPhoneUrl(phoneNumber: string): string {
  return `tel:${normalizePhoneHref(phoneNumber)}`;
}

/**
 * Valida formato E.164 (+ seguido de 8 a 19 dígitos).
 * @param number - Número a validar.
 * @returns true se o formato for válido.
 */
export function isValidE164(number: string): boolean {
  return /^\+[0-9]{8,19}$/.test(number.trim());
}

/**
 * Valida e-mail opcional (vazio é aceite).
 * @param email - Endereço de e-mail a validar.
 * @returns true se vazio ou formato de e-mail válido.
 */
export function isValidOptionalEmail(email: string): boolean {
  const trimmed: string = email.trim();
  if (!trimmed) {
    return true;
  }
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

/**
 * Valida URL opcional (vazio é aceite).
 * @param url - URL a validar.
 * @returns true se vazio ou URL http(s) válida.
 */
export function isValidOptionalUrl(url: string): boolean {
  const trimmed: string = url.trim();
  if (!trimmed) {
    return true;
  }
  return /^https?:\/\/.+/.test(trimmed);
}
