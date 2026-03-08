import Link from "next/link";

export function Hero() {
  return (
    <section className="rounded-2xl bg-gradient-to-r from-cerrado-700 to-cerrado-500 p-8 text-white">
      <h1 className="text-3xl font-bold">Plataforma Identidade Cerrado</h1>
      <p className="mt-3 max-w-3xl text-cerrado-50">
        Um ambiente digital para aprender sobre fauna, flora, cultura e práticas sustentáveis do Cerrado por meio de histórias, jogos e materiais educativos.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/biblioteca" className="rounded bg-white px-4 py-2 font-semibold text-cerrado-700">
          Explorar histórias
        </Link>
        <Link href="/jogos" className="rounded border border-white px-4 py-2 font-semibold">
          Jogar agora
        </Link>
      </div>
    </section>
  );
}
