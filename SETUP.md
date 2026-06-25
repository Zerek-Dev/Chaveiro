# Site Chaveiro 24h — Setup

Projeto **Next.js** (App Router, `output: export`) + **Firebase** (Hosting, Firestore, Auth).

Os dados pessoais/credenciais foram removidos. Substitui os valores marcados com `YOUR_...` / `XXXX` / `example` antes de publicar.

## 1. Instalar

```bash
npm install
```

## 2. Configurar (substituir placeholders)

| Ficheiro | O que preencher |
|----------|-----------------|
| `lib/firebase-config.ts` | Credenciais do teu projeto Firebase + telefone/WhatsApp do negócio |
| `.firebaserc` | ID do teu projeto Firebase |
| `lib/seo.ts` | `SITE_URL` → domínio final |
| `lib/google-ads.ts` | (Opcional) ID Google Ads e rótulo de conversão; senão, remove `GoogleAdsTag` de `app/layout.tsx` |

> Nota: `lib/developer.ts` contém o crédito do criador original do site (rodapé). Manter.

## 3. Desenvolver

```bash
npm run dev
```

Abre http://localhost:3000

## 4. Build e deploy (Firebase Hosting)

```bash
npm run build
npx firebase-tools deploy --only hosting
```

## Notas

- Painel admin em `/admin/` (requer conta no Firebase Auth + documento `admins/{uid}` no Firestore).
- Regras do Firestore em `firestore.rules`.
- O site funciona com valores padrão (`lib/firebase-config.ts`) mesmo antes de ligar o Firestore.
