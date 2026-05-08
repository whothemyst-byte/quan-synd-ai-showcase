export type DashboardTheme = "light" | "dark";
export type ThemePreference = DashboardTheme | "system";

const THEME_STORAGE_KEY = "theme";
const THEME_CHANGE_EVENT = "quansynd-theme-change";

export function getStoredTheme(): DashboardTheme {
  if (typeof window === "undefined") {
    return "light";
  }

  const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return savedTheme === "dark" ? "dark" : "light";
}

export function resolveTheme(theme: ThemePreference): DashboardTheme {
  if (theme === "system") {
    if (typeof window === "undefined") {
      return "light";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  return theme;
}

export function applyTheme(theme: DashboardTheme) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  window.document.documentElement.classList.toggle("dark", theme === "dark");
  window.dispatchEvent(new CustomEvent(THEME_CHANGE_EVENT, { detail: { theme } }));
}

export function setThemeClass(theme: DashboardTheme) {
  if (typeof window === "undefined") {
    return;
  }

  window.document.documentElement.classList.toggle("dark", theme === "dark");
}

export function subscribeThemeChange(handler: (theme: DashboardTheme) => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const onThemeChange = (event: Event) => {
    const customEvent = event as CustomEvent<{ theme?: DashboardTheme }>;
    if (customEvent.detail?.theme) {
      handler(customEvent.detail.theme);
    }
  };

  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY) {
      handler(getStoredTheme());
    }
  };

  window.addEventListener(THEME_CHANGE_EVENT, onThemeChange as EventListener);
  window.addEventListener("storage", onStorage);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, onThemeChange as EventListener);
    window.removeEventListener("storage", onStorage);
  };
}
