export const SITE_NAME = "QuanSynd";

export const DEFAULT_SITE_URL = "https://quansynd.com";

export function getSiteUrl(): string {
  const envUrl = import.meta.env.VITE_SITE_URL as string | undefined;
  return (envUrl && envUrl.trim()) || DEFAULT_SITE_URL;
}

export function absoluteUrl(pathname: `/${string}` | "/"): string {
  const base = getSiteUrl().replace(/\/+$/, "");
  if (pathname === "/") return `${base}/`;
  return `${base}${pathname}`;
}

