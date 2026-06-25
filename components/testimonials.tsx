"use client";

import { Star } from "lucide-react";
import { useSite } from "@/providers/site-provider";
import { buildDefaultServiceAreas } from "@/lib/site-defaults";
import { buildTestimonials, buildTestimonialsHeading } from "@/lib/testimonials";

/**
 * Secção de depoimentos com locais dinâmicos vindos das zonas de atuação.
 */
export function Testimonials() {
  const { site } = useSite();
  const areas =
    site.serviceAreas.length > 0 ? site.serviceAreas : buildDefaultServiceAreas();
  const heading: string = buildTestimonialsHeading(areas);
  const testimonials = buildTestimonials(areas);
  return (
    <section className="bg-secondary/50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} className="size-5 fill-accent text-accent" />
            ))}
          </div>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {heading}
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="size-4 fill-accent text-accent" />
                ))}
              </div>
              <blockquote className="mt-3 flex-1 text-pretty leading-relaxed text-foreground">
                {`"${testimonial.text}"`}
              </blockquote>
              <figcaption className="mt-4 border-t border-border/60 pt-4">
                <span className="block font-semibold text-foreground">
                  {testimonial.name}
                </span>
                <span className="text-sm text-muted-foreground">
                  {testimonial.location}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
