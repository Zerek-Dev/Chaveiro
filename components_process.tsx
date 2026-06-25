import { PhoneCall, MapPinned, Wrench } from "lucide-react"

const steps = [
  {
    icon: PhoneCall,
    title: "1. Ligue-nos",
    description:
      "Descreva a situação ao telefone. Damos-lhe logo uma estimativa do preço e do tempo de chegada.",
  },
  {
    icon: MapPinned,
    title: "2. Deslocamo-nos a si",
    description:
      "Um técnico vai ao local com todo o equipamento necessário, a qualquer hora do dia ou da noite.",
  },
  {
    icon: Wrench,
    title: "3. Resolvemos na hora",
    description:
      "Abrimos, copiamos ou instalamos o que precisa. Só paga quando o trabalho estiver concluído.",
  },
]

export function Process() {
  return (
    <section id="como-funciona" className="bg-primary py-16 text-primary-foreground md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            Como funciona
          </span>
          <h2 className="mt-2 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Simples, rápido e sem complicações
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.title}
              className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-6"
            >
              <span className="flex size-12 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <step.icon className="size-6" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
