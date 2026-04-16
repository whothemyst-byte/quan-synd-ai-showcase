create table if not exists public.payment_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan_tier text not null check (plan_tier in ('spark', 'flux', 'forge')),
  billing_interval text not null check (billing_interval in ('monthly', 'annual')),
  plan_id text not null,
  amount_cents integer not null check (amount_cents >= 0),
  currency text not null default 'USD',
  provider text not null default 'razorpay',
  provider_order_id text unique,
  provider_payment_id text unique,
  provider_signature text,
  status text not null default 'created' check (status in ('created', 'authorized', 'paid', 'failed', 'cancelled', 'refunded')),
  payment_method text,
  error_code text,
  error_description text,
  receipt_url text,
  invoice_id uuid references public.billing_invoices(id) on delete set null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists payment_attempts_user_id_created_at_idx
  on public.payment_attempts (user_id, created_at desc);

create index if not exists payment_attempts_provider_order_id_idx
  on public.payment_attempts (provider_order_id);

alter table public.payment_attempts enable row level security;

drop policy if exists "payment_attempts_select_own" on public.payment_attempts;
create policy "payment_attempts_select_own"
  on public.payment_attempts
  for select
  using (auth.uid() = user_id);

alter table public.billing_invoices
  alter column provider set default 'razorpay';

create or replace function public.complete_subscription_checkout(
  p_plan_id text,
  p_billing_interval text,
  p_provider_ref text default null,
  p_payment_method text default null,
  p_receipt_url text default null,
  p_provider text default 'razorpay',
  p_user_id_override uuid default null
)
returns public.billing_invoices
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_role text := auth.role();
  v_user_id uuid := auth.uid();
  v_plan public.plans%rowtype;
  v_subscription_id uuid;
  v_period_start timestamptz := now();
  v_period_end timestamptz;
  v_invoice public.billing_invoices%rowtype;
begin
  if p_user_id_override is not null then
    if v_role <> 'service_role' then
      raise exception 'Only service role can provide user override';
    end if;
    v_user_id := p_user_id_override;
  end if;

  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  if p_billing_interval not in ('monthly', 'annual') then
    raise exception 'Invalid billing interval';
  end if;

  if p_provider is null or length(trim(p_provider)) = 0 then
    p_provider := 'razorpay';
  end if;

  select *
  into v_plan
  from public.plans
  where id = p_plan_id
    and "interval" = p_billing_interval;

  if not found then
    raise exception 'Invalid plan_id';
  end if;

  if p_provider_ref is not null then
    select *
    into v_invoice
    from public.billing_invoices
    where provider = p_provider
      and provider_ref = p_provider_ref
    limit 1;

    if found then
      return v_invoice;
    end if;
  end if;

  v_period_end := case
    when p_billing_interval = 'annual' then now() + interval '1 year'
    else now() + interval '1 month'
  end;

  select id
  into v_subscription_id
  from public.subscriptions
  where user_id = v_user_id
  order by updated_at desc nulls last, created_at desc
  limit 1;

  if v_subscription_id is null then
    insert into public.subscriptions (
      user_id,
      plan_id,
      status,
      current_period_start,
      current_period_end,
      provider
    )
    values (
      v_user_id,
      p_plan_id,
      'active',
      v_period_start,
      v_period_end,
      p_provider
    )
    returning id into v_subscription_id;
  else
    update public.subscriptions
    set
      plan_id = p_plan_id,
      status = 'active',
      current_period_start = v_period_start,
      current_period_end = v_period_end,
      provider = p_provider,
      updated_at = now()
    where id = v_subscription_id;
  end if;

  update public.profiles
  set
    tier = v_plan.tier,
    updated_at = now()
  where id = v_user_id;

  insert into public.billing_invoices (
    user_id,
    plan_tier,
    billing_interval,
    amount,
    currency,
    status,
    provider,
    provider_ref,
    payment_method,
    period_start,
    period_end,
    receipt_url
  )
  values (
    v_user_id,
    v_plan.tier,
    p_billing_interval,
    v_plan.price_cents / 100.0,
    v_plan.currency,
    'paid',
    p_provider,
    p_provider_ref,
    p_payment_method,
    v_period_start::date,
    (v_period_end - interval '1 day')::date,
    p_receipt_url
  )
  returning * into v_invoice;

  return v_invoice;
end;
$function$;
