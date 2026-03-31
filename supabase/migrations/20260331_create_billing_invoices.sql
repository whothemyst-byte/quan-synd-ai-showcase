create extension if not exists pgcrypto;

create table if not exists public.billing_invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  invoice_number text not null unique default ('INV-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 12))),
  plan_tier text not null check (plan_tier in ('spark', 'flux', 'forge')),
  billing_interval text not null check (billing_interval in ('monthly', 'annual')),
  amount numeric(10,2) not null check (amount >= 0),
  currency text not null default 'USD',
  status text not null default 'paid' check (status in ('pending', 'paid', 'failed', 'refunded')),
  provider text not null default 'cashfree',
  provider_ref text unique,
  payment_method text,
  period_start date,
  period_end date,
  receipt_url text,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists billing_invoices_user_id_created_at_idx
  on public.billing_invoices (user_id, created_at desc);

alter table public.billing_invoices enable row level security;

drop policy if exists "billing_invoices_select_own" on public.billing_invoices;
create policy "billing_invoices_select_own"
  on public.billing_invoices
  for select
  using (auth.uid() = user_id);

drop policy if exists "billing_invoices_insert_own" on public.billing_invoices;
create policy "billing_invoices_insert_own"
  on public.billing_invoices
  for insert
  with check (auth.uid() = user_id);

drop policy if exists "billing_invoices_update_own" on public.billing_invoices;
create policy "billing_invoices_update_own"
  on public.billing_invoices
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
