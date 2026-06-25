import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Layout do painel admin — não deve aparecer nos resultados do Google.
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return children;
}
