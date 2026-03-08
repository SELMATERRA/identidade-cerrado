import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export async function createStory(formData: FormData) {
  const supabase = createSupabaseServerClient();

  await supabase.from("stories").insert({
    title: formData.get("title"),
    summary: formData.get("summary"),
    content: formData.get("content"),
    category: formData.get("category"),
    published: formData.get("published") === "on"
  });

  revalidatePath("/admin");
  revalidatePath("/biblioteca");
}

export async function createCharacter(formData: FormData) {
  const supabase = createSupabaseServerClient();

  await supabase.from("characters").insert({
    name: formData.get("name"),
    species: formData.get("species"),
    region: formData.get("region"),
    description: formData.get("description"),
    conservation_status: formData.get("conservation_status")
  });

  revalidatePath("/admin");
  revalidatePath("/personagens");
}
