-- Run in Supabase SQL editor
create table if not exists public.posts (
  id bigserial primary key,
  content text,
  topic text,
  tone text,
  keywords text,
  platform text,
  created_at timestamptz default now()
);

create table if not exists public.schedule (
  id bigserial primary key,
  post_id bigint references public.posts(id) on delete cascade,
  scheduled_time timestamptz not null,
  platform text,
  created_at timestamptz default now()
);

create table if not exists public.brand_settings (
  id integer primary key default 1,
  tone text,
  keywords text,
  brand_color text,
  brand_name text,
  brand_voice text,
  target_audience text,
  updated_at timestamptz default now()
);

create table if not exists public.contact_messages (
  id bigserial primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);
