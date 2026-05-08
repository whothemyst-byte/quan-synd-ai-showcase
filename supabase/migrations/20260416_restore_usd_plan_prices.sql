-- Restore production USD pricing after temporary INR test pricing
update public.plans
set
  price_cents = case id
    when 'spark_monthly' then 0
    when 'spark_annual' then 0
    when 'flux_monthly' then 1200
    when 'flux_annual' then 1000
    when 'forge_monthly' then 2500
    when 'forge_annual' then 2000
    else price_cents
  end,
  currency = 'USD'
where id in (
  'spark_monthly',
  'spark_annual',
  'flux_monthly',
  'flux_annual',
  'forge_monthly',
  'forge_annual'
);
