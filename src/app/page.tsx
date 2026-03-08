import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <Hero />

      <section>
        <SectionTitle title="Explore a plataforma" subtitle="Conteúdo educativo para estudantes, educadores e comunidades." />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["Biblioteca de histórias", "/biblioteca"],
            ["Personagens do Cerrado", "/personagens"],
            ["Área educativa", "/area-educativa"]
          ].map(([title, href]) => (
            <Link key={href} href={href} className="rounded-xl border border-cerrado-200 bg-white p-4 shadow-sm">
              <h3 className="font-semibold text-cerrado-800">{title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
