import { createStory } from "@/lib/actions";

export function StoryForm() {
  return (
    <form action={createStory} className="space-y-2 rounded-lg border border-cerrado-200 bg-white p-4">
      <h3 className="font-semibold">Nova história</h3>
      <input name="title" placeholder="Título" className="w-full rounded border p-2" required />
      <input name="summary" placeholder="Resumo" className="w-full rounded border p-2" required />
      <textarea name="content" placeholder="Conteúdo" className="w-full rounded border p-2" rows={4} required />
      <input name="category" placeholder="Categoria" className="w-full rounded border p-2" required />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" /> Publicada
      </label>
      <button className="rounded bg-cerrado-600 px-3 py-2 text-white" type="submit">
        Salvar história
      </button>
    </form>
  );
}
