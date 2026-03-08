import { SectionTitle } from "@/components/ui/SectionTitle";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { Material } from "@/types";

function hasValidFileUrl(fileUrl: unknown): fileUrl is string {
  if (typeof fileUrl !== "string") return false;

  const trimmed = fileUrl.trim();
  if (!trimmed) return false;

  if (trimmed.startsWith("/")) return true;

  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

const fallbackMaterials: Material[] = [
  {
    id: "1",
    title: "Cartilha do Cerrado",
    description: "Material introdutório para turmas do ensino fundamental.",
    file_url: "#",
    category: "Cartilha",
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    title: "Plano de aula: Nascentes",
    description: "Atividades práticas sobre recursos hídricos.",
    file_url: "#",
    category: "Plano de aula",
    created_at: new Date().toISOString()
  }
];

export default async function AreaEducativaPage() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.from("materials").select("*").order("created_at", { ascending: false });
  const materials: Material[] = data?.length ? data : fallbackMaterials;

  return (
    <section>
      <SectionTitle title="Área educativa" subtitle="Baixe recursos para aulas, oficinas e estudos comunitários." />
      <div className="space-y-3">
        {materials.map((material) => (
          <article key={material.id} className="rounded-xl border border-cerrado-200 bg-white p-4">
            <h3 className="font-semibold">{material.title}</h3>
            <p className="text-sm text-cerrado-700">{material.description}</p>
            {hasValidFileUrl(material.file_url) ? (
              <a
                href={material.file_url}
                className="mt-2 inline-block text-sm font-medium text-cerrado-700 underline"
                target="_blank"
                rel="noreferrer"
              >
                Download ({material.category})
              </a>
            ) : (
              <span className="mt-2 inline-block text-sm font-medium text-cerrado-400">Arquivo indisponível</span>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
