const MONTHS: Record<string, number> = {
  january: 1, february: 2, march: 3, april: 4, may: 5, june: 6,
  july: 7, august: 8, september: 9, october: 10, november: 11, december: 12,
};

export type YearMonth = { year: number; month: number };

function parsePoint(text: string): YearMonth | null {
  const t = text.trim().toLowerCase();
  if (t === "present" || t === "current") {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() + 1 };
  }
  const m = t.match(/^(?:([a-z]+)\s+)?(\d{4})$/);
  if (!m) return null;
  return { year: Number(m[2]), month: m[1] ? MONTHS[m[1]] ?? 1 : 1 };
}

/** Parses "June 2024 – July 2025" / "May 2024 – Present" / "2023". */
export function parsePeriod(period: string): { start: YearMonth; end: YearMonth } {
  const [a, b] = period.split(/\s*[–—-]\s*/);
  const start = parsePoint(a);
  if (!start) throw new Error(`Unparseable period: "${period}"`);
  const end = (b && parsePoint(b)) || start;
  return { start, end };
}

/** First four-digit year in a string such as "Seattle University · 2025". */
export function yearIn(text: string): number | null {
  const m = text.match(/\b(19|20)\d{2}\b/);
  return m ? Number(m[0]) : null;
}
