import { createContext, useContext, type ReactNode } from "react";
import type { DashboardTheme } from "@/lib/theme";

type DashboardThemeContextValue = {
  theme: DashboardTheme;
};

const DashboardThemeContext = createContext<DashboardThemeContextValue | null>(null);

export type DashboardSurfaceStyles = {
  shell: string;
  sidebar: string;
  header: string;
  divider: string;
  card: string;
  cardSoft: string;
  cardHover: string;
  border: string;
  borderSoft: string;
  text: string;
  textStrong: string;
  textMuted: string;
  textFaint: string;
  button: string;
  buttonGhost: string;
  navActive: string;
  navIdle: string;
  upgrade: string;
  logoText: string;
};

const darkStyles: DashboardSurfaceStyles = {
  shell: "bg-zinc-950 text-zinc-50",
  sidebar: "border-zinc-800/70 bg-[#0c0c0e]",
  header: "border-zinc-800/70 bg-zinc-950/95",
  divider: "border-zinc-800/70",
  card: "bg-[#0f0f11]",
  cardSoft: "bg-zinc-950/70",
  cardHover: "bg-zinc-900/70",
  border: "border-zinc-800/70",
  borderSoft: "border-zinc-800/80",
  text: "text-zinc-50",
  textStrong: "text-white",
  textMuted: "text-zinc-400",
  textFaint: "text-zinc-500",
  button: "border-zinc-700 bg-zinc-900/60 text-zinc-100 hover:bg-zinc-800",
  buttonGhost: "border-zinc-800 bg-zinc-900/70 text-zinc-200 hover:border-amber-500/40 hover:text-white",
  navActive: "border-amber-500/40 bg-amber-500/10 text-white",
  navIdle: "border-transparent text-zinc-400 hover:border-zinc-800 hover:bg-zinc-900/70 hover:text-white",
  upgrade: "border-zinc-800 bg-zinc-900/70 text-zinc-200 hover:border-amber-500/40 hover:text-white",
  logoText: "text-zinc-50",
};

const lightStyles: DashboardSurfaceStyles = {
  shell: "bg-[#f7f1e7] text-zinc-900",
  sidebar: "border-stone-200 bg-[#fbf7f0]",
  header: "border-stone-200 bg-[#f7f1e7]/95",
  divider: "border-stone-200",
  card: "bg-white",
  cardSoft: "bg-[#fffdf8]",
  cardHover: "bg-[#f8f3ea]",
  border: "border-stone-200",
  borderSoft: "border-stone-300",
  text: "text-zinc-900",
  textStrong: "text-zinc-900",
  textMuted: "text-zinc-600",
  textFaint: "text-zinc-500",
  button: "border-stone-300 bg-white text-zinc-900 hover:bg-stone-50",
  buttonGhost: "border-stone-300 bg-white text-zinc-900 hover:border-amber-500/40 hover:bg-stone-50",
  navActive: "border-amber-500/40 bg-amber-500/10 text-zinc-900",
  navIdle: "border-transparent text-zinc-600 hover:border-stone-200 hover:bg-white hover:text-zinc-900",
  upgrade: "border-stone-300 bg-white text-zinc-900 hover:border-amber-500/40 hover:bg-stone-50",
  logoText: "text-zinc-900",
};

export function DashboardThemeProvider({
  theme,
  children,
}: {
  theme: DashboardTheme;
  children: ReactNode;
}) {
  return <DashboardThemeContext.Provider value={{ theme }}>{children}</DashboardThemeContext.Provider>;
}

export function useDashboardTheme() {
  const value = useContext(DashboardThemeContext);
  return value?.theme ?? "dark";
}

export function useDashboardSurfaceStyles() {
  const theme = useDashboardTheme();
  return theme === "dark" ? darkStyles : lightStyles;
}
