import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { getDb } from "@/lib/firebase/client";
import { buildDefaultSiteConfig } from "@/lib/site-defaults";
import { defaultCarouselImages } from "@/lib/firebase-config";
import type { SiteConfig } from "@/types/site";

/** URLs legadas do site antigo que não existem no template atual. */
const LEGACY_CAROUSEL_IMAGES: string[] = [
  "/images/chaveiro-1.jpg",
  "/images/chaveiro-2.jpg",
  "/images/chaveiro-3.jpg",
  "/images/chaveiro-4.jpg",
];

/**
 * Substitui URLs de carrossel legadas pelas imagens do template original.
 * @param images - Lista vinda do Firestore.
 * @returns URLs válidas para o site atual.
 */
function normalizeCarouselImages(images: string[]): string[] {
  if (images.length === 0) {
    return [...defaultCarouselImages];
  }
  const hasLegacyOnly: boolean = images.every((url) =>
    LEGACY_CAROUSEL_IMAGES.includes(url)
  );
  if (hasLegacyOnly) {
    return [...defaultCarouselImages];
  }
  return images;
}

/**
 * Busca a configuração do site em site/config no Firestore.
 * @returns Configuração persistida ou valores padrão se o documento não existir.
 */
export async function fetchSiteConfig(): Promise<SiteConfig> {
  const configRef = doc(getDb(), "site", "config");
  const snapshot = await getDoc(configRef);
  if (!snapshot.exists()) {
    return buildDefaultSiteConfig();
  }
  const data = snapshot.data() as SiteConfig;
  const fallback = buildDefaultSiteConfig();
  return {
    whatsappNumber: data.whatsappNumber ?? fallback.whatsappNumber,
    whatsappMessage: data.whatsappMessage ?? fallback.whatsappMessage,
    businessName: data.businessName ?? fallback.businessName,
    phoneNumber: data.phoneNumber ?? fallback.phoneNumber,
    email: data.email ?? fallback.email,
    physicalAddress: data.physicalAddress ?? fallback.physicalAddress,
    hours: data.hours ?? fallback.hours,
    instagramUrl: data.instagramUrl ?? fallback.instagramUrl,
    carouselImages: normalizeCarouselImages(
      Array.isArray(data.carouselImages) ? data.carouselImages : []
    ),
    updatedAt: data.updatedAt,
  };
}

/**
 * Grava a configuração do site (apenas administradores autenticados).
 * @param config - Dados de contacto, negócio e galeria sem updatedAt.
 * @returns Promise resolvida após persistência no Firestore.
 */
export async function saveSiteConfig(
  config: Omit<SiteConfig, "updatedAt">
): Promise<void> {
  const configRef = doc(getDb(), "site", "config");
  await setDoc(
    configRef,
    {
      ...config,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}
