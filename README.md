# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/402ae051-baad-4641-a6ea-7a592f7bdd71

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/402ae051-baad-4641-a6ea-7a592f7bdd71) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/402ae051-baad-4641-a6ea-7a592f7bdd71) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Razorpay Payment Setup

The checkout flow now uses Razorpay + Supabase Edge Functions.

### 1) Frontend env

Add to your local frontend env file (for example `.env.local`):

```bash
VITE_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
```

### 2) Supabase Edge Function secrets

Set these in your Supabase project:

```bash
supabase secrets set RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxx
supabase secrets set RAZORPAY_KEY_SECRET=xxxxxxxxxx
supabase secrets set RAZORPAY_WEBHOOK_SECRET=xxxxxxxxxx
```

### 3) Deploy edge functions

```bash
supabase functions deploy create-razorpay-order
supabase functions deploy verify-razorpay-payment
supabase functions deploy razorpay-webhook --no-verify-jwt
```

### 4) Run database migration

Apply:

- `supabase/migrations/20260416_razorpay_checkout_flow.sql`

### 5) Configure Razorpay webhook

In Razorpay dashboard, point webhook URL to:

- `https://<your-project-ref>.functions.supabase.co/razorpay-webhook`

Use the same webhook secret configured as `RAZORPAY_WEBHOOK_SECRET`.
