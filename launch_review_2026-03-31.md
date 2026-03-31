# Quansynd-Web Launch Review

Date: 2026-03-31

Scope:
- Security review
- Production readiness review
- Network exposure review
- Runtime exploit review

## Executive Summary

This codebase is not safe for a paid production launch in its current form.

The main blockers are:
- A user can obtain a "paid" subscription and invoice without real payment verification.
- The billing invoice table allows authenticated users to insert and update their own invoice rows.
- The checkout flow is still a simulated payment flow.
- The repo is not in a clean, reproducible release state because critical app and migration directories are untracked.

The app does build successfully, but build success is not enough here. The billing path and deployment hygiene need more work before launch.

## Critical Findings

1. Payment bypass: "paid" subscription and invoice can be granted without real payment verification
- [src/pages/Checkout.tsx](/C:/Users/admin/Desktop/Quansynd/Quansynd-Web/src/pages/Checkout.tsx#L34-L65)
- [src/components/dashboard/dashboardSupabase.ts](/C:/Users/admin/Desktop/Quansynd/Quansynd-Web/src/components/dashboard/dashboardSupabase.ts#L202-L223)
- [supabase/migrations/20260331_harden_billing_checkout.sql](/C:/Users/admin/Desktop/Quansynd/Quansynd-Web/supabase/migrations/20260331_harden_billing_checkout.sql#L1-L112)
- The UI explicitly simulates payment with a 2 second delay.
- The backend RPC marks subscriptions active and invoices paid without proof from Cashfree or a webhook.
- Exploit impact: any authenticated user can complete checkout and receive a paid invoice and active subscription.

2. Billing invoices can be forged or modified by the user
- [supabase/migrations/20260331_create_billing_invoices.sql](/C:/Users/admin/Desktop/Quansynd/Quansynd-Web/supabase/migrations/20260331_create_billing_invoices.sql#L24-L43)
- The RLS policies allow authenticated users to `INSERT` and `UPDATE` their own invoice rows.
- Exploit impact: a logged-in user can write a fake paid invoice, alter amounts, or modify receipt links on their own records.
- If entitlement logic ever depends on invoice rows, this becomes a tier escalation path.

3. Unlimited invoice spam is possible
- [supabase/migrations/20260331_create_billing_invoices.sql](/C:/Users/admin/Desktop/Quansynd/Quansynd-Web/supabase/migrations/20260331_create_billing_invoices.sql#L13-L13)
- [supabase/migrations/20260331_harden_billing_checkout.sql](/C:/Users/admin/Desktop/Quansynd/Quansynd-Web/supabase/migrations/20260331_harden_billing_checkout.sql#L80-L108)
- `provider_ref` is nullable and unique, which still allows unlimited `NULL` values in Postgres.
- The checkout RPC does not enforce idempotency or rate limiting.
- Exploit impact: invoice table spam, dashboard noise, and possible storage/billing abuse.

## High Severity Findings

4. Production payment flow is still simulated
- [src/pages/Checkout.tsx](/C:/Users/admin/Desktop/Quansynd/Quansynd-Web/src/pages/Checkout.tsx#L28-L36)
- The checkout page still contains a fake payment delay and does not verify a real payment session.
- Even if the UI looks polished, this is not production-grade monetization.

5. Release state is not reproducible from git
- `git status` showed critical directories as untracked:
  - `supabase/`
  - `src/components/dashboard/`
  - `src/pages/dashboard/`
- Impact: a deploy from a tracked git revision may miss the billing code and migrations.

6. Supabase configuration can fail open or misroute traffic
- [src/lib/supabase.ts](/C:/Users/admin/Desktop/Quansynd/Quansynd-Web/src/lib/supabase.ts#L1-L7)
- The client falls back to a hardcoded Supabase URL and a dummy anon key.
- Impact: production can boot into a confusing misconfigured state instead of failing fast.

7. Database migration coverage is incomplete for a full rebuild
- [supabase/migrations/20260331_create_billing_invoices.sql](/C:/Users/admin/Desktop/Quansynd/Quansynd-Web/supabase/migrations/20260331_create_billing_invoices.sql)
- [supabase/migrations/20260331_harden_billing_checkout.sql](/C:/Users/admin/Desktop/Quansynd/Quansynd-Web/supabase/migrations/20260331_harden_billing_checkout.sql)
- The repo only contains the new billing migrations, but the app depends on broader Supabase objects like `plans`, `subscriptions`, and `api_keys`.
- Impact: new environment rebuilds are not fully captured in versioned migrations.

## Network Exposure Findings

8. `.env` is not ignored
- [.gitignore](/C:/Users/admin/Desktop/Quansynd/Quansynd-Web/.gitignore)
- A root `.env` file exists, and the ignore rules do not protect it.
- Impact: easy accidental commit of secrets or future service-role keys.

9. No security headers or CSP are configured
- [index.html](/C:/Users/admin/Desktop/Quansynd/Quansynd-Web/index.html)
- [vercel.json](/C:/Users/admin/Desktop/Quansynd/Quansynd-Web/vercel.json)
- The app loads third-party scripts and inline config without a CSP or baseline hardening headers.
- Impact: any XSS becomes much more damaging, and third-party script compromise has a larger blast radius.

10. External scripts and fonts increase exposure
- [index.html](/C:/Users/admin/Desktop/Quansynd/Quansynd-Web/index.html)
- [src/index.css](/C:/Users/admin/Desktop/Quansynd/Quansynd-Web/src/index.css)
- Google Tag Manager and Google Fonts add external network dependencies and privacy exposure.

11. Dev server binds to all interfaces
- [vite.config.ts](/C:/Users/admin/Desktop/Quansynd/Quansynd-Web/vite.config.ts)
- `server.host = "::"` makes the dev server reachable on the LAN.
- Impact: acceptable for local development, but not ideal on untrusted networks.

12. One external link uses `noreferrer` without `noopener`
- [src/pages/dashboard/Billing.tsx](/C:/Users/admin/Desktop/Quansynd/Quansynd-Web/src/pages/dashboard/Billing.tsx)
- Impact: low, but `noopener noreferrer` is the safer default.

## Runtime Exploit Findings

13. Client-triggered entitlement logic can be abused
- [src/pages/Checkout.tsx](/C:/Users/admin/Desktop/Quansynd/Quansynd-Web/src/pages/Checkout.tsx#L15-L26)
- Plan and billing interval are driven from URL params.
- This is not the primary issue, but it makes the business logic easier to manipulate if backend checks are weak.

14. `dangerouslySetInnerHTML` is present in multiple places
- [src/pages/BlogPost.tsx](/C:/Users/admin/Desktop/Quansynd/Quansynd-Web/src/pages/BlogPost.tsx)
- [src/components/QuanBench.tsx](/C:/Users/admin/Desktop/Quansynd/Quansynd-Web/src/components/QuanBench.tsx)
- [src/components/QuanBenchCard.tsx](/C:/Users/admin/Desktop/Quansynd/Quansynd-Web/src/components/QuanBenchCard.tsx)
- [src/components/ui/chart.tsx](/C:/Users/admin/Desktop/Quansynd/Quansynd-Web/src/components/ui/chart.tsx)
- Current data sources appear mostly internal, but this is a clear future XSS footgun if any of those inputs become user-controlled.

15. Receipt URLs are rendered as clickable external links
- [src/pages/dashboard/Billing.tsx](/C:/Users/admin/Desktop/Quansynd/Quansynd-Web/src/pages/dashboard/Billing.tsx)
- Impact: low today because users only see their own rows, but it becomes a phishing or malicious-link primitive if invoice data ever comes from untrusted sources.

16. Legacy `start_subscription` must be audited in the live database
- The repo does not define it in migrations, but the database did expose it earlier in Supabase.
- Impact: if it remains callable by clients, it is another direct upgrade primitive.

## Verification Results

- `npm run lint` passed
- `npm run build` passed
- Supabase verification confirmed:
  - `billing_invoices` exists
  - `complete_subscription_checkout` exists
  - plan pricing was updated in the database

## Launch Verdict

Not production-ready for a paid launch today.

The app is close on build and routing, but the monetization and trust boundaries are still unsafe. The minimum fix set before launch is:
- Replace simulated checkout with a real provider verification flow.
- Make invoice writes server-only and idempotent.
- Remove the ability for end users to forge paid invoices.
- Clean up untracked deploy-critical files and tighten production config.

## Suggested Next Step

If you want, I can turn this review into a concrete hardening plan with exact code and migration changes, ordered by what must be fixed before launch.
