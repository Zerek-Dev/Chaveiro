/**
 * Configuração do projeto Firebase e valores padrão do site.
 * Preservado do projeto anterior — usado quando o Firestore ainda não tem dados.
 */

/**
 * Credenciais do app web Firebase, lidas de variáveis de ambiente.
 * Defina estas variáveis nas "Vars" do projeto (e no .env.local em desenvolvimento):
 *   NEXT_PUBLIC_FIREBASE_API_KEY
 *   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
 *   NEXT_PUBLIC_FIREBASE_PROJECT_ID
 *   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
 *   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
 *   NEXT_PUBLIC_FIREBASE_APP_ID
 *   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
 * Os valores vêm da Consola Firebase > Definições do projeto > Os teus apps > Configuração do SDK.
 */
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "",
} as const;

/**
 * Indica se as credenciais do Firebase foram devidamente configuradas.
 * Usado para evitar inicializar o Firebase com valores vazios.
 */
export const isFirebaseConfigured =
  firebaseConfig.apiKey.length > 0 && firebaseConfig.projectId.length > 0;

/**
 * Configuração padrão do negócio (fallback antes do painel admin).
 * SUBSTITUIR pelos dados de contacto reais do negócio.
 */
export const defaultSiteConfig = {
  whatsappNumber: "+000000000000",
  whatsappMessage: "Olá! Preciso de um chaveiro com urgência.",
  businessName: "Chaveiro 24 Horas",
  phoneNumber: "+000000000000",
  email: "",
  physicalAddress: "",
  hours: "Disponível 24 horas por dia, todos os dias",
  instagramUrl: "",
} as const;

/** Imagens padrão do site (template original do repositório). */
export const defaultCarouselImages = [
  "/images/chaveiro-hero.png",
] as const;

/** Cidades legadas (coleção locations). */
export const defaultLocations = [
  { name: "Lisboa", order: 1, active: true },
  { name: "Sintra", order: 2, active: true },
  { name: "Setúbal", order: 3, active: true },
  { name: "Cascais", order: 4, active: true },
  { name: "Amadora", order: 5, active: true },
  { name: "Oeiras", order: 6, active: true },
] as const;

/** Cidades e bairros padrão (coleções cities / neighborhoods). */
export const defaultServiceAreas = [
  {
    name: "Lisboa",
    order: 1,
    active: true,
    neighborhoods: ["Benfica", "Alvalade", "Campo de Ourique", "Parque das Nações", "Alcântara"],
  },
  {
    name: "Sintra",
    order: 2,
    active: true,
    neighborhoods: ["Agualva", "Mem Martins", "Queluz", "Cacém"],
  },
  {
    name: "Setúbal",
    order: 3,
    active: true,
    neighborhoods: ["Centro", "Barreiro", "Almada"],
  },
  {
    name: "Cascais",
    order: 4,
    active: true,
    neighborhoods: ["Estoril", "Carcavelos", "Parede"],
  },
] as const;
