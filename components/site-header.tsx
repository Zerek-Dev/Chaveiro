"use client";

import { useState } from "react";
import { KeyRound, MessageCircle, Menu, X } from "lucide-react";
import { useSite } from "@/providers/site-provider";
import { handleContactConversionClick } from "@/lib/google-ads";

const navLinks = [
  { label: "Serviços", href: "#servicos" },
  { label: "Porquê nós", href: "#porque-nos" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Zona", href: "#zona" },
  { label: "Contacto", href: "#contacto" },
];

export function SiteHeader() {
  const { site } = useSite();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <a href="#inicio" className="flex items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <KeyRound className="size-5" />
          </span>
          <span className="text-lg font-bold tracking-tight text-foreground">
            {site.name}
          </span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={site.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => handleContactConversionClick(event, true)}
            className="hidden items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 sm:flex"
          >
            <MessageCircle className="size-4" />
            {site.phoneDisplay}
          </a>
          <button
            type="button"
            aria-label="Abrir menu"
            onClick={() => setOpen((value) => !value)}
            className="flex size-10 items-center justify-center rounded-md border border-border text-foreground md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border/60 bg-background md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-border/40 py-3 text-sm font-medium text-foreground last:border-0"
              >
                {link.label}
              </a>
            ))}
            <a
              href={site.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => {
                handleContactConversionClick(event, true);
                setOpen(false);
              }}
              className="mt-3 mb-2 flex items-center justify-center gap-2 rounded-md bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground"
            >
              <MessageCircle className="size-4" />
              WhatsApp — {site.phoneDisplay}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
