"use client";

import { FormEvent, useEffect, useState } from "react";
import { fetchSiteConfig, saveSiteConfig } from "@/services/config-service";
import { isValidE164, isValidOptionalUrl, isValidOptionalEmail } from "@/lib/contact-utils";
import { AdminAlert } from "@/components/admin/admin-alerts";
import type { SiteConfig } from "@/types/site";

/**
 * Painel de configuração de contacto, morada e redes sociais do negócio.
 */
export function ConfigPanel() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [alert, setAlert] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  useEffect(() => {
    fetchSiteConfig().then(setConfig);
  }, []);
  /**
   * Valida e grava a configuração de contacto no Firestore.
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (!config) {
      return;
    }
    if (!isValidE164(config.whatsappNumber)) {
      setAlert({ message: "WhatsApp inválido. Use formato E.164 (+351...).", type: "error" });
      return;
    }
    if (!isValidOptionalEmail(config.email)) {
      setAlert({ message: "E-mail inválido.", type: "error" });
      return;
    }
    if (!isValidOptionalUrl(config.instagramUrl)) {
      setAlert({ message: "URL do Instagram inválida.", type: "error" });
      return;
    }
    if (!config.hours.trim()) {
      setAlert({ message: "O horário é obrigatório.", type: "error" });
      return;
    }
    setIsSaving(true);
    try {
      await saveSiteConfig({
        whatsappNumber: config.whatsappNumber.trim(),
        whatsappMessage: config.whatsappMessage.trim(),
        businessName: config.businessName.trim(),
        phoneNumber: config.phoneNumber.trim(),
        email: config.email.trim(),
        physicalAddress: config.physicalAddress.trim(),
        hours: config.hours.trim(),
        instagramUrl: config.instagramUrl.trim(),
        carouselImages: config.carouselImages,
      });
      setAlert({ message: "Configuração guardada com sucesso.", type: "success" });
    } catch {
      setAlert({ message: "Erro ao guardar. Confirme se tem permissões de administrador.", type: "error" });
    } finally {
      setIsSaving(false);
    }
  }
  if (!config) {
    return <p className="text-sm text-muted-foreground">A carregar configuração...</p>;
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {alert && (
        <AdminAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <p className="text-sm text-muted-foreground">
        Os dados abaixo aparecem na secção &quot;Contacto&quot; do site público e no rodapé.
      </p>
      <fieldset className="space-y-4">
        <legend className="text-base font-semibold text-foreground">Negócio</legend>
        <div>
          <label className="block text-sm font-medium">Nome do negócio</label>
          <input
            value={config.businessName}
            onChange={(event) =>
              setConfig({ ...config, businessName: event.target.value })
            }
            className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>
      </fieldset>
      <fieldset className="grid gap-4 md:grid-cols-2">
        <legend className="col-span-full mb-2 text-base font-semibold text-foreground">
          Telefone e WhatsApp
        </legend>
        <div>
          <label className="block text-sm font-medium">Telefone (E.164)</label>
          <input
            value={config.phoneNumber}
            onChange={(event) =>
              setConfig({ ...config, phoneNumber: event.target.value })
            }
            placeholder="+351912345678"
            className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">WhatsApp (E.164)</label>
          <input
            value={config.whatsappNumber}
            onChange={(event) =>
              setConfig({ ...config, whatsappNumber: event.target.value })
            }
            placeholder="+351912345678"
            className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>
        <div className="col-span-full">
          <label className="block text-sm font-medium">Mensagem padrão WhatsApp</label>
          <textarea
            value={config.whatsappMessage}
            onChange={(event) =>
              setConfig({ ...config, whatsappMessage: event.target.value })
            }
            rows={3}
            className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>
      </fieldset>
      <fieldset className="grid gap-4 md:grid-cols-2">
        <legend className="col-span-full mb-2 text-base font-semibold text-foreground">
          E-mail e redes sociais
        </legend>
        <div>
          <label className="block text-sm font-medium">E-mail</label>
          <input
            type="email"
            value={config.email}
            onChange={(event) => setConfig({ ...config, email: event.target.value })}
            placeholder="geral@empresa.pt"
            className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Instagram (opcional)</label>
          <input
            value={config.instagramUrl}
            onChange={(event) =>
              setConfig({ ...config, instagramUrl: event.target.value })
            }
            placeholder="https://instagram.com/a_sua_conta"
            className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>
      </fieldset>
      <fieldset className="space-y-4">
        <legend className="text-base font-semibold text-foreground">Morada e horário</legend>
        <div>
          <label className="block text-sm font-medium">Morada física</label>
          <input
            value={config.physicalAddress}
            onChange={(event) =>
              setConfig({ ...config, physicalAddress: event.target.value })
            }
            placeholder="Rua Exemplo, 12 — Lisboa"
            className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
          />
          <p className="mt-1 text-xs text-muted-foreground">
            Morada da sede ou oficina — os clientes sabem de onde o serviço parte.
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium">Horário</label>
          <input
            value={config.hours}
            onChange={(event) => setConfig({ ...config, hours: event.target.value })}
            placeholder="Disponível 24 horas por dia, todos os dias"
            className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
          />
        </div>
      </fieldset>
      <button
        type="submit"
        disabled={isSaving}
        className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-60"
      >
        {isSaving ? "A guardar..." : "Guardar contacto"}
      </button>
    </form>
  );
}
