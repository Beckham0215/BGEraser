"use client";

const DAILY_LIMIT = 3;
const STORAGE_KEY = "bgeraser_usage";

interface UsageData {
  date: string; // YYYY-MM-DD
  count: number;
}

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function readUsage(): UsageData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { date: getToday(), count: 0 };
    const data = JSON.parse(raw) as UsageData;
    // Reset count if it's a new day
    if (data.date !== getToday()) return { date: getToday(), count: 0 };
    return data;
  } catch {
    return { date: getToday(), count: 0 };
  }
}

function writeUsage(data: UsageData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // localStorage unavailable (private browsing edge case)
  }
}

export function useRateLimit() {
  const canProcess = (): boolean => readUsage().count < DAILY_LIMIT;

  const increment = (): void => {
    const usage = readUsage();
    writeUsage({ date: usage.date, count: usage.count + 1 });
  };

  const remaining = (): number =>
    Math.max(0, DAILY_LIMIT - readUsage().count);

  return { canProcess, increment, remaining, dailyLimit: DAILY_LIMIT };
}
