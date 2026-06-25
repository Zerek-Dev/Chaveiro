import Image from "next/image"
import { BadgeEuro, Timer, ShieldCheck, ThumbsUp } from "lucide-react"

const reasons = [
  {
    icon: Timer,
    title: "Resposta rápida",
    description: "Estamos perto de si e chegamos o mais depressa possível.",
  },
  {
    icon: BadgeEuro,
    title: "Preços justos",
    description: "Orçamento claro antes de começar. Sem custos escondidos.",
  },
  {
    icon: ShieldCheck,
    title: "Trabalho garantido",
    description: "Técnicos experientes e materiais certificados.",
  },
  {
    icon: ThumbsUp,
    title: "Sem danos",
    description: "Métodos não destrutivos sempre que a porta o permite.",
  },
]

export function WhyUs() {
  return (
    <section id="porque-nos" className="py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2 md:px-6">
        <div className="order-2 md:order-1">
          <div className="overflow-hidden rounded-2xl border border-border shadow-lg">
            <Image
              src="/images/copia-chaves.png"
              alt="Conjunto de chaves de casa e automóvel sobre uma superfície escura"
              width={680}
              height={520}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="order-1 md:order-2">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            Porquê escolher-nos
          </span>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Um chaveiro em quem pode confiar
          </h2>
          <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
            Sabemos que quando precisa de um chaveiro está numa situação de
            stress. O nosso compromisso é resolver com rapidez, transparência e
            respeito pela sua casa.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {reasons.map((reason) => (
              <div key={reason.title} className="flex gap-3">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <reason.icon className="size-6" />
                </span>
                <div>
                  <h3 className="font-bold text-foreground">{reason.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/75">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
