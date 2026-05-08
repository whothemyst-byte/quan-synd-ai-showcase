import {
  VIBE_ADE_DOWNLOAD_URL,
  VIBE_ADE_DOWNLOAD_VERSION,
} from "./vibeAdeRelease";

export {
  VIBE_ADE_DOWNLOAD_VERSION,
  VIBE_ADE_DOWNLOAD_URL,
} from "./vibeAdeRelease";

export type VibeAdePlanId = "spark" | "flux" | "forge";

export interface VibeAdePlan {
  id: VibeAdePlanId;
  label: string;
  tagline: string;
  monthlyPrice: number;
  annualPrice: number;
  cta: string;
  ctaHref: string;
  ctaExternal: boolean;
  highlight: boolean;
  dark: boolean;
  badge: string | null;
  features: string[];
}

export const VIBE_ADE_PRICING_PLANS: VibeAdePlan[] = [
  {
    id: "spark",
    label: "SPARK",
    tagline: "Strike the first spark",
    monthlyPrice: 0,
    annualPrice: 0,
    cta: "Get Started Free",
    ctaHref: VIBE_ADE_DOWNLOAD_URL,
    ctaExternal: true,
    highlight: false,
    dark: false,
    badge: null,
    features: [
      "2 workspaces",
      "4 terminal panes per workspace",
      "Cloud sync (2 workspaces)",
      "Community support",
    ],
  },
  {
    id: "flux",
    label: "FLUX",
    tagline: "Stay in the flow",
    monthlyPrice: 12,
    annualPrice: 10,
    cta: "Start Flux",
    ctaHref: "/checkout?plan=flux&interval=monthly",
    ctaExternal: false,
    highlight: true,
    dark: false,
    badge: "MOST POPULAR",
    features: [
      "Everything in Spark",
      "Unlimited workspaces",
      "Unlimited terminal panes",
      "Cloud sync — unlimited",
      "Task board — 300 tasks/month",
      "20 QuanSwarm runs / month",
      "5 concurrent agents per swarm",
      "Email support — 48 hr response",
      "Live usage counter in dashboard",
    ],
  },
  {
    id: "forge",
    label: "FORGE",
    tagline: "Build without limits",
    monthlyPrice: 25,
    annualPrice: 20,
    cta: "Start Forge",
    ctaHref: "/checkout?plan=forge&interval=monthly",
    ctaExternal: false,
    highlight: false,
    dark: true,
    badge: null,
    features: [
      "Everything in Flux",
      "Unlimited task board",
      "Unlimited QuanSwarm runs",
      "Unlimited concurrent agents",
      "Priority email — 12 hr response",
      "Beta / early access builds",
      "Advanced analytics & agent logs",
      "All future Pro+ features auto-unlock",
    ],
  },
];
