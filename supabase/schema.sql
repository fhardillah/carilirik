create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null check (username ~ '^[A-Za-z0-9_]{3,24}$'),
  email text not null,
  created_at timestamptz not null default now()
);

create unique index if not exists profiles_username_lower_key
  on public.profiles (lower(username));

create or replace function public.is_username_available(candidate_username text)
returns boolean
language sql
security definer
set search_path = ''
as $$
  select not exists (
    select 1
    from public.profiles
    where lower(username) = lower(candidate_username)
  ) and not exists (
    select 1
    from auth.users
    where lower(coalesce(raw_user_meta_data ->> 'username', '')) = lower(candidate_username)
  );
$$;

create or replace function public.is_email_available(candidate_email text)
returns boolean
language sql
security definer
set search_path = ''
as $$
  select not exists (
    select 1
    from auth.users
    where lower(email) = lower(btrim(candidate_email))
  );
$$;

revoke all on function public.is_username_available(text) from public;
grant execute on function public.is_username_available(text) to anon, authenticated;
revoke all on function public.is_email_available(text) from public;
grant execute on function public.is_email_available(text) to anon, authenticated;

alter table public.profiles enable row level security;

grant select on public.profiles to authenticated;

drop policy if exists "Users can read their own profile" on public.profiles;
create policy "Users can read their own profile"
  on public.profiles
  for select
  to authenticated
  using ((select auth.uid()) = id);

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, username, email)
  values (
    new.id,
    new.raw_user_meta_data ->> 'username',
    new.email
  )
  on conflict (id) do update
    set username = excluded.username,
        email = excluded.email;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert or update of email, raw_user_meta_data on auth.users
  for each row execute function public.handle_new_auth_user();

create table if not exists public.account_data (
  user_id uuid primary key references auth.users (id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.account_data enable row level security;
grant select, insert, update on public.account_data to authenticated;

drop policy if exists "Users can read their own account data" on public.account_data;
create policy "Users can read their own account data"
  on public.account_data
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert their own account data" on public.account_data;
create policy "Users can insert their own account data"
  on public.account_data
  for insert
  to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own account data" on public.account_data;
create policy "Users can update their own account data"
  on public.account_data
  for update
  to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

notify pgrst, 'reload schema';
