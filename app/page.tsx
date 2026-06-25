import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { WhyUs } from "@/components/why-us";
import { Process } from "@/components/process";
import { Coverage } from "@/components/coverage";
import { Testimonials } from "@/components/testimonials";
import { ContactCta } from "@/components/contact-cta";
import { SiteFooter } from "@/components/site-footer";
import { FloatingCall } from "@/components/floating-call";
import { SeoStructuredData } from "@/components/seo-structured-data";
import { SiteProvider } from "@/providers/site-provider";

export default function Page() {
  return (
    <SiteProvider>
      <SeoStructuredData />
      <SiteHeader />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Process />
        <Coverage />
        <Testimonials />
        <ContactCta />
      </main>
      <SiteFooter />
      <FloatingCall />
    </SiteProvider>
  );
}
