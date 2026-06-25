import type { MouseEvent } from "react";

/** ID da conta Google Ads (etiqueta global gtag.js). SUBSTITUIR pelo teu ID. */
export const GOOGLE_ADS_ID: string = "AW-XXXXXXXXXX";

/** Destino do evento de conversão "Contacto". SUBSTITUIR pelo teu rótulo. */
export const GOOGLE_ADS_CONTACT_CONVERSION_SEND_TO: string =
  "AW-XXXXXXXXXX/XXXXXXXXXXXXXXXXXXX";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    gtag_report_conversion?: (url?: string, openInNewTab?: boolean) => boolean;
  }
}

/**
 * Invoca gtag_report_conversion (snippet oficial Google Ads para cliques).
 * Retorna false quando a conversão é registada e a navegação fica no callback.
 *
 * @param url - URL de destino (tel:, wa.me, etc.).
 * @param openInNewTab - true abre WhatsApp/links externos numa nova aba.
 * @returns false se interceptou o clique; true se gtag ainda não carregou.
 */
export function reportGoogleAdsContactConversion(
  url: string,
  openInNewTab: boolean = false,
): boolean {
  if (typeof window === "undefined") {
    return true;
  }
  if (typeof window.gtag_report_conversion !== "function") {
    return true;
  }
  return window.gtag_report_conversion(url, openInNewTab);
}

/**
 * Handler de onClick para links de contacto (telefone ou WhatsApp).
 * Usa gtag_report_conversion antes de abrir tel: ou wa.me.
 *
 * @param event - Evento de clique do elemento <a>.
 * @param openInNewTab - true para WhatsApp (nova aba).
 * @returns void
 */
export function handleContactConversionClick(
  event: MouseEvent<HTMLAnchorElement>,
  openInNewTab: boolean = false,
): void {
  const url: string = event.currentTarget.href;
  const shouldFollowDefault: boolean = reportGoogleAdsContactConversion(
    url,
    openInNewTab,
  );
  if (!shouldFollowDefault) {
    event.preventDefault();
  }
}
