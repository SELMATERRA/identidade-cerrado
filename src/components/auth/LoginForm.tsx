"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";

export function LoginForm() {
  const router = useRouter();
  const supabase = createSupabaseBrowserClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (mode === "signin") {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError(signInError.message);
        return;
      }
    } else {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } }
      });

      if (signUpError) {
        setError(signUpError.message);
        return;
      }

      if (data.user) {
        await supabase.from("profiles").upsert({
          id: data.user.id,
          full_name: fullName || "Usuário",
          role: "student"
        });
      }
    }

    router.push("/perfil");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4 rounded-xl border border-cerrado-200 bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-cerrado-800">{mode === "signin" ? "Entrar" : "Criar conta"}</h1>

      {mode === "signup" ? (
        <input
          className="w-full rounded border p-2"
          placeholder="Nome completo"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      ) : null}

      <input className="w-full rounded border p-2" type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input className="w-full rounded border p-2" type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button className="w-full rounded bg-cerrado-600 py-2 font-semibold text-white" type="submit">
        {mode === "signin" ? "Entrar" : "Cadastrar"}
      </button>

      <button
        type="button"
        className="text-sm text-cerrado-700 underline"
        onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
      >
        {mode === "signin" ? "Ainda não tem conta? Cadastre-se" : "Já possui conta? Entrar"}
      </button>
    </form>
  );
}
