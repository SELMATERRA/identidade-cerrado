import { createCharacter } from "@/lib/actions";

export function CharacterForm() {
  return (
    <form action={createCharacter} className="space-y-2 rounded-lg border border-cerrado-200 bg-white p-4">
      <h3 className="font-semibold">Novo personagem</h3>
      <input name="name" placeholder="Nome" className="w-full rounded border p-2" required />
      <input name="species" placeholder="Espécie" className="w-full rounded border p-2" required />
      <input name="region" placeholder="Região" className="w-full rounded border p-2" required />
      <textarea name="description" placeholder="Descrição" className="w-full rounded border p-2" rows={3} required />
      <input name="conservation_status" placeholder="Status de conservação" className="w-full rounded border p-2" required />
      <button className="rounded bg-cerrado-600 px-3 py-2 text-white" type="submit">
        Salvar personagem
      </button>
    </form>
  );
}
