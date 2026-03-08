import { SectionTitle } from "@/components/ui/SectionTitle";
import { fallbackCharacters } from "@/lib/data";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { Character } from "@/types";

export default async function PersonagensPage() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.from("characters").select("*").order("created_at", { ascending: false });

  const characters: Character[] = data?.length ? data : fallbackCharacters;

  return (
    <section>
      <SectionTitle title="Personagens" subtitle="Conheça os guardiões e espécies do Cerrado." />
      <div className="grid gap-4 md:grid-cols-3">
        {characters.map((character) => (
          <article key={character.id} className="rounded-xl border border-cerrado-200 bg-white p-4">
            <h3 className="text-lg font-semibold text-cerrado-800">{character.name}</h3>
            <p className="text-sm text-cerrado-700">{character.species}</p>
            <p className="mt-2 text-cerrado-800">{character.description}</p>
            <p className="mt-2 text-xs text-cerrado-700">Status: {character.conservation_status}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
