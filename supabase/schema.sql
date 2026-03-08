-- Enable extensions
create extension if not exists "uuid-ossp";

-- Profiles linked to auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  avatar_url text,
  bio text,
  role text not null default 'student' check (role in ('student', 'teacher', 'admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.stories (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  summary text not null,
  content text not null,
  category text not null,
  image_url text,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.characters (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  species text not null,
  region text not null,
  description text not null,
  image_url text,
  conservation_status text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.materials (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text not null,
  file_url text not null,
  category text not null,
  created_at timestamptz not null default now()
);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.stories enable row level security;
alter table public.characters enable row level security;
alter table public.materials enable row level security;

-- Public read access for educational content
create policy "Public can read published stories"
on public.stories for select
using (published = true);

create policy "Public can read characters"
on public.characters for select
using (true);

create policy "Public can read materials"
on public.materials for select
using (true);

-- User profile policies
create policy "Users can read own profile"
on public.profiles for select
using (auth.uid() = id);

create policy "Users can update own profile"
on public.profiles for update
using (auth.uid() = id);

create policy "Users can insert own profile"
on public.profiles for insert
with check (auth.uid() = id);

-- Admin policies for management
create policy "Admins manage stories"
on public.stories
for all
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "Admins manage characters"
on public.characters
for all
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);

create policy "Admins manage materials"
on public.materials
for all
using (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
)
with check (
  exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.role = 'admin'
  )
);
