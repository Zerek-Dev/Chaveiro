/**
 * Configuração do projeto Firebase e valores padrão do site.
 * Preservado do projeto anterior — usado quando o Firestore ainda não tem dados.
 */

/**
 * Credenciais do app web Firebase.
 * SUBSTITUIR pelos valores do teu próprio projeto Firebase
 * (Consola Firebase > Definições do projeto > Os teus apps > Configuração do SDK).
 */
export const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID",
} as const;

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
