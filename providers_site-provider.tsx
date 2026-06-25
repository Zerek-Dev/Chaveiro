"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { fetchSiteConfig } from "@/services/config-service";
import { fetchServiceAreas } from "@/services/areas-service";
import {
  buildDefaultSiteConfig,
  buildDefaultServiceAreas,
  buildSiteViewModel,
} from "@/lib/site-defaults";
import type { SiteViewModel } from "@/types/site";

interface SiteContextValue {
  site: SiteViewModel;
  isLoading: boolean;
  refresh: () => Promise<void>;
}

const defaultSite = buildSiteViewModel(
  buildDefaultSiteConfig(),
  buildDefaultServiceAreas()
);

const SiteContext = createContext<SiteContextValue>({
  site: defaultSite,
  isLoading: true,
  refresh: async () => {},
});

/**
 * Provider que carrega configuração e zonas de atuação do Firestore para o site público.
 * @param children - Componentes filhos que consomem useSite().
 */
export function SiteProvider({ children }: { children: ReactNode }) {
  const [site, setSite] = useState<SiteViewModel>(defaultSite);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  /**
   * Recarrega dados do Firestore e atualiza o contexto.
   */
  async function refresh(): Promise<void> {
    try {
      const [config, areas] = await Promise.all([
        fetchSiteConfig(),
        fetchServiceAreas(),
      ]);
      setSite(buildSiteViewModel(config, areas));
    } catch {
      setSite(
        buildSiteViewModel(buildDefaultSiteConfig(), buildDefaultServiceAreas())
      );
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    refresh();
  }, []);
  const value = useMemo(
    () => ({ site, isLoading, refresh }),
    [site, isLoading]
  );
  return (
    <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
  );
}

/**
 * Hook para aceder aos dados dinâmicos do site (Firestore + fallback).
 * @returns SiteViewModel, estado de carregamento e função refresh.
 */
export function useSite(): SiteContextValue {
  return useContext(SiteContext);
}
