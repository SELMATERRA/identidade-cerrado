import Link from "next/link";

const links = [
  ["/", "Home"],
  ["/sobre", "Sobre"],
  ["/biblioteca", "Biblioteca"],
  ["/personagens", "Personagens"],
  ["/area-educativa", "Área educativa"],
  ["/jogos", "Jogos"],
  ["/login", "Entrar"]
] as const;

export function Navbar() {
  return (
    <header className="border-b border-cerrado-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-bold text-cerrado-700">
          Identidade Cerrado
        </Link>
        <nav className="flex flex-wrap gap-4 text-sm font-medium text-cerrado-800">
          {links.map(([href, label]) => (
            <Link key={href} href={href} className="hover:text-cerrado-500">
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
