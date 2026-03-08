import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export default async function PerfilPage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();

  return (
    <section className="rounded-xl bg-white p-6">
      <h1 className="text-2xl font-bold text-cerrado-800">Meu perfil</h1>
      <p className="mt-2">Nome: {profile?.full_name ?? "Sem nome"}</p>
      <p>E-mail: {user.email}</p>
      <p>Função: {profile?.role ?? "student"}</p>
      {profile?.role === "admin" ? (
        <Link href="/admin" className="mt-4 inline-block rounded bg-cerrado-600 px-4 py-2 text-white">
          Acessar painel administrativo
        </Link>
      ) : null}
    </section>
  );
}
