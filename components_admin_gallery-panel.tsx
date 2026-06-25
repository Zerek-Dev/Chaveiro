"use client";

import { FormEvent, useEffect, useState } from "react";
import { fetchSiteConfig, saveSiteConfig } from "@/services/config-service";
import { AdminAlert } from "@/components/admin/admin-alerts";
import type { SiteConfig } from "@/types/site";

/**
 * Painel de gestão das imagens do carrossel (hero).
 */
export function GalleryPanel() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [urlsText, setUrlsText] = useState<string>("");
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  useEffect(() => {
    fetchSiteConfig().then((loadedConfig) => {
      setConfig(loadedConfig);
      setUrlsText(loadedConfig.carouselImages.join("\n"));
    });
  }, []);
  /**
   * Converte texto (uma URL por linha) em array de imagens.
   */
  function parseUrls(text: string): string[] {
    return text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  }
  /**
   * Guarda URLs do carrossel no Firestore.
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (!config) {
      return;
    }
    const images: string[] = parseUrls(urlsText);
    if (images.length === 0 || images.length > 10) {
      setAlert({ message: "Indique entre 1 e 10 URLs de imagem.", type: "error" });
      return;
    }
    setIsSaving(true);
    try {
      await saveSiteConfig({
        whatsappNumber: config.whatsappNumber,
        whatsappMessage: config.whatsappMessage,
        businessName: config.businessName,
        phoneNumber: config.phoneNumber,
        email: config.email,
        physicalAddress: config.physicalAddress,
        hours: config.hours,
        instagramUrl: config.instagramUrl,
        carouselImages: images,
      });
      setConfig({ ...config, carouselImages: images });
      setAlert({ message: "Galeria atualizada com sucesso.", type: "success" });
    } catch {
      setAlert({ message: "Erro ao guardar galeria.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  }
  if (!config) {
    return <p className="text-sm text-muted-foreground">A carregar galeria...</p>;
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {alert && (
        <AdminAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <p className="text-sm text-muted-foreground">
        Uma URL por linha. Use caminhos relativos (/images/imagem.jpg) ou URLs completas.
      </p>
      <textarea
        value={urlsText}
        onChange={(event) => setUrlsText(event.target.value)}
        rows={8}
        className="w-full rounded-md border border-border px-3 py-2 font-mono text-sm"
        placeholder="/images/chaveiro-hero.png"
      />
      <button
        type="submit"
        disabled={isSaving}
        className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
      >
        {isSaving ? "A guardar..." : "Guardar galeria"}
      </button>
    </form>
  );
}
