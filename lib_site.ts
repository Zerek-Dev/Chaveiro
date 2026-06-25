import {
  buildDefaultSiteConfig,
  buildDefaultServiceAreas,
  buildSiteViewModel,
} from "@/lib/site-defaults";

/** Fallback estático para metadata e SSR (valores padrão do Firebase config). */
export const site = buildSiteViewModel(
  buildDefaultSiteConfig(),
  buildDefaultServiceAreas()
);
