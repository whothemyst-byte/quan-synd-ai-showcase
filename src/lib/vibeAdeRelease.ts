export const VIBE_ADE_DOWNLOAD_VERSION = "0.4.0";

export const VIBE_ADE_DOWNLOAD_URL =
  `https://github.com/whothemyst-byte/Vibe_ADE/releases/download/v${VIBE_ADE_DOWNLOAD_VERSION}/Vibe-ADE-${VIBE_ADE_DOWNLOAD_VERSION}-setup-x64.exe`;

export const VIBE_ADE_LAUNCH_LABEL = "April 12, 2026";
export const VIBE_ADE_LAUNCH_AT = new Date(2026, 3, 12, 0, 0, 0, 0);

export type VibeAdeCountdown = {
  totalMs: number;
  isLive: boolean;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function normalizeDate(input: Date | number | string | null | undefined) {
  if (input instanceof Date && !Number.isNaN(input.getTime())) {
    return input;
  }

  const candidate = new Date(input ?? Date.now());
  return Number.isNaN(candidate.getTime()) ? new Date() : candidate;
}

export function getVibeAdeCountdown(now: Date | number | string | null = new Date()): VibeAdeCountdown {
  const current = normalizeDate(now);
  const totalMs = VIBE_ADE_LAUNCH_AT.getTime() - current.getTime();
  const safeMs = Math.max(totalMs, 0);

  const days = Math.floor(safeMs / 86_400_000);
  const hours = Math.floor((safeMs % 86_400_000) / 3_600_000);
  const minutes = Math.floor((safeMs % 3_600_000) / 60_000);
  const seconds = Math.floor((safeMs % 60_000) / 1_000);

  return {
    totalMs,
    isLive: totalMs <= 0,
    days: pad(days),
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
  };
}

export function formatVibeAdeCountdown(countdown: VibeAdeCountdown) {
  if (countdown.isLive) {
    return "Live now";
  }

  return `${countdown.days}d ${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s`;
}
