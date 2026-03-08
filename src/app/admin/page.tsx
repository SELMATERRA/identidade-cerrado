import { redirect } from "next/navigation";
import { StoryForm } from "@/components/admin/StoryForm";
import { CharacterForm } from "@/components/admin/CharacterForm";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export default async function AdminPage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") redirect("/perfil");

  const { data: stories } = await supabase.from("stories").select("id,title,published").order("created_at", { ascending: false });
  const { data: characters } = await supabase.from("characters").select("id,name,species").order("created_at", { ascending: false });

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold text-cerrado-800">Painel administrativo</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <StoryForm />
        <CharacterForm />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-cerrado-200 bg-white p-4">
          <h2 className="mb-2 font-semibold">Histórias cadastradas</h2>
          <ul className="space-y-1 text-sm">
            {stories?.map((story) => (
              <li key={story.id}>
                {story.title} {story.published ? "✅" : "📝"}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-lg border border-cerrado-200 bg-white p-4">
          <h2 className="mb-2 font-semibold">Personagens cadastrados</h2>
          <ul className="space-y-1 text-sm">
            {characters?.map((character) => (
              <li key={character.id}>
                {character.name} - {character.species}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
