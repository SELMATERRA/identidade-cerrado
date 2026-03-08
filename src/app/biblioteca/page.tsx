import { SectionTitle } from "@/components/ui/SectionTitle";
import { fallbackStories } from "@/lib/data";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { Story } from "@/types";

export default async function BibliotecaPage() {
  const supabase = createSupabaseServerClient();
  const { data } = await supabase.from("stories").select("*").eq("published", true).order("created_at", { ascending: false });

  const stories: Story[] = data?.length ? data : fallbackStories;

  return (
    <section>
      <SectionTitle title="Biblioteca de histórias" subtitle="Histórias e memórias para aprender e preservar o Cerrado." />
      <div className="grid gap-4 md:grid-cols-2">
        {stories.map((story) => (
          <article key={story.id} className="rounded-xl border border-cerrado-200 bg-white p-4">
            <h3 className="text-xl font-semibold text-cerrado-800">{story.title}</h3>
            <p className="mt-2 text-sm text-cerrado-700">{story.summary}</p>
            <p className="mt-3 text-cerrado-800">{story.content}</p>
            <span className="mt-3 inline-block rounded bg-cerrado-100 px-2 py-1 text-xs">{story.category}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
