"use client";

import { FormEvent, useState } from "react";
import { loginAdmin } from "@/services/auth-service";
import { AdminAlert } from "@/components/admin/admin-alerts";

/**
 * Formulário de login do painel administrativo (Firebase Auth).
 */
export function AuthPanel() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  /**
   * Submete credenciais ao Firebase Authentication.
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await loginAdmin(email, password);
    } catch {
      setError("E-mail ou palavra-passe incorretos.");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 shadow-sm">
      <h1 className="text-2xl font-bold text-foreground">Painel Admin</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Inicie sessão com a conta de administrador para gerir o site.
      </p>
      {error && <AdminAlert message={error} type="error" onClose={() => setError("")} />}
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="admin-email" className="block text-sm font-medium">
            E-mail
          </label>
          <input
            id="admin-email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="admin-password" className="block text-sm font-medium">
            Palavra-passe
          </label>
          <input
            id="admin-password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {isLoading ? "A entrar..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
