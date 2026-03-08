export type UserRole = "student" | "teacher" | "admin";

export interface Profile {
  id: string;
  full_name: string;
  avatar_url: string | null;
  bio: string | null;
  role: UserRole;
  created_at: string;
}

export interface Story {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  image_url: string | null;
  published: boolean;
  created_at: string;
}

export interface Character {
  id: string;
  name: string;
  species: string;
  region: string;
  description: string;
  image_url: string | null;
  conservation_status: string;
  created_at: string;
}

export interface Material {
  id: string;
  title: string;
  description: string;
  file_url: string;
  category: string;
  created_at: string;
}
