"use client";

import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import {
  isCurrentUserAdmin,
  logoutAdmin,
  onAdminAuthChange,
} from "@/services/auth-service";
import { AuthPanel } from "@/components/admin/auth-panel";
import { ConfigPanel } from "@/components/admin/config-panel";
import { GalleryPanel } from "@/components/admin/gallery-panel";
import { AreasPanel } from "@/components/admin/areas-panel";

type AdminTab = "contacto" | "galeria" | "areas";

/**
 * Página do painel administrativo com autenticação e gestão modular.
 */
export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<AdminTab>("contacto");
  /**
   * Verifica se o utilizador autenticado é administrador.
   */
  async function verifyAdmin(firebaseUser: User | null): Promise<void> {
    if (!firebaseUser) {
      setIsAdmin(false);
      setIsChecking(false);
      return;
    }
    const adminStatus: boolean = await isCurrentUserAdmin(firebaseUser.uid);
    setIsAdmin(adminStatus);
    setIsChecking(false);
  }
  useEffect(() => {
    const unsubscribe = onAdminAuthChange((firebaseUser) => {
      setUser(firebaseUser);
      setIsChecking(true);
      verifyAdmin(firebaseUser);
    });
    return unsubscribe;
  }, []);
  /**
   * Termina sessão do administrador.
   */
  async function handleLogout(): Promise<void> {
    await logoutAdmin();
  }
  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">A verificar sessão...</p>
      </div>
    );
  }
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/30 px-4">
        <AuthPanel />
      </div>
    );
  }
  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-secondary/30 px-4">
        <p className="text-sm text-red-600">
          A conta {user.email} não tem permissão de administrador.
        </p>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Sair
        </button>
      </div>
    );
  }
  const tabs: { id: AdminTab; label: string }[] = [
    { id: "contacto", label: "Contacto" },
    { id: "galeria", label: "Galeria" },
    { id: "areas", label: "Zona de atuação" },
  ];
  return (
    <div className="min-h-screen bg-secondary/20">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 md:px-6">
          <div>
            <h1 className="text-xl font-bold">Painel Admin</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className="flex gap-2">
            <a
              href="/"
              className="rounded-md border border-border px-3 py-2 text-sm font-medium"
            >
              Ver site
            </a>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground"
            >
              Sair
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8 md:px-6">
        <nav className="mb-6 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-md px-4 py-2 text-sm font-medium ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-background text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          {activeTab === "contacto" && <ConfigPanel />}
          {activeTab === "galeria" && <GalleryPanel />}
          {activeTab === "areas" && <AreasPanel />}
        </div>
      </main>
    </div>
  );
}
