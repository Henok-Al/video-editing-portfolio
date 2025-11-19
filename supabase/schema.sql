-- Create projects table
create table projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  youtube_id text,
  thumbnail_url text,
  description text,
  categories text[],
  format text,
  duration_seconds integer,
  tools text[],
  role text,
  visibility text default 'draft' check (visibility in ('draft', 'published', 'unlisted')),
  sort_index integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create indexes
create index projects_sort_index_idx on projects (sort_index);
create index projects_visibility_idx on projects (visibility);
create index projects_created_at_idx on projects (created_at);

-- Enable Row Level Security
alter table projects enable row level security;

-- Create policies (adjust as needed for your auth setup)
create policy "Anyone can read published projects" on projects
  for select using (visibility = 'published');

create policy "Admins can manage all projects" on projects
  for all using (auth.role() = 'authenticated');

-- Add policy for service role to bypass RLS in server actions
create policy "Service role can manage all projects" on projects
  for all using (auth.role() = 'service_role');