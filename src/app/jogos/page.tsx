import { MemoryGame } from "@/components/games/MemoryGame";
import { CerradoQuiz } from "@/components/games/CerradoQuiz";
import { ProtectNatureGame } from "@/components/games/ProtectNatureGame";
import { SectionTitle } from "@/components/ui/SectionTitle";

export default function JogosPage() {
  return (
    <section className="space-y-6">
      <SectionTitle title="Jogos educativos" subtitle="Aprenda brincando com desafios sobre fauna e preservação." />
      <div className="grid gap-4">
        <MemoryGame />
        <CerradoQuiz />
        <ProtectNatureGame />
      </div>
    </section>
  );
}
