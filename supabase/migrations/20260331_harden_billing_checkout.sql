create or replace function public.complete_subscription_checkout(
  p_plan_id text,
  p_billing_interval text,
  p_provider_ref text default null,
  p_payment_method text default null,
  p_receipt_url text default null
)
returns public.billing_invoices
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  v_user_id uuid := auth.uid();
  v_plan public.plans%rowtype;
  v_subscription_id uuid;
  v_period_start timestamptz := now();
  v_period_end timestamptz;
  v_invoice public.billing_invoices%rowtype;
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  if p_billing_interval not in ('monthly', 'annual') then
    raise exception 'Invalid billing interval';
  end if;

  select * into v_plan
  from public.plans
  where id = p_plan_id
    and "interval" = p_billing_interval;

  if not found then
    raise exception 'Invalid plan_id';
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
      'cashfree'
    )
    returning id into v_subscription_id;
  else
    update public.subscriptions
    set
      plan_id = p_plan_id,
      status = 'active',
      current_period_start = v_period_start,
      current_period_end = v_period_end,
      provider = 'cashfree',
      updated_at = now()
    where id = v_subscription_id;
  end if;

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
    'cashfree',
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

update public.plans
set price_cents = case id
  when 'spark_monthly' then 0
  when 'spark_annual' then 0
  when 'flux_monthly' then 1200
  when 'flux_annual' then 1000
  when 'forge_monthly' then 2500
  when 'forge_annual' then 2000
  else price_cents
end
where id in ('spark_monthly', 'spark_annual', 'flux_monthly', 'flux_annual', 'forge_monthly', 'forge_annual');
