/** Modelo de um depoimento de cliente no site público. */
export interface Testimonial {
  name: string;
  location: string;
  text: string;
}

/** Textos e nomes dos depoimentos (os locais vêm das zonas de atuação no Firestore). */
export const testimonialTemplates = [
  {
    name: "Ana Marques",
    text: "Fiquei fechada fora de casa à meia-noite e em menos de 30 minutos estava resolvido. Profissional e simpático.",
  },
  {
    name: "João Pereira",
    text: "Trocaram a fechadura da minha porta blindada com toda a competência. Preço justo e explicaram tudo.",
  },
  {
    name: "Marta Silva",
    text: "Precisei de uma cópia urgente da chave do prédio e foram muito depressa. Recomendo a toda a gente.",
  },
] as const;
