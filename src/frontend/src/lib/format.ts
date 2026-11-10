/**
 * Formats a backend cent amount into a localized currency string.
 * Backend amounts are integer cents; the currency code comes from the
 * backend Balance record.
 */
export function formatCurrency(amountCents: bigint, currency: string): string {
  const value = Number(amountCents) / 100;
  try {
    return new Intl.NumberFormat("en-IE", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${value.toFixed(2)} ${currency}`;
  }
}

/** Compact euro formatting for chart axis labels, e.g. €1.2k. */
export function formatCompactCurrency(
  amountCents: bigint,
  currency = "EUR",
): string {
  const value = Number(amountCents) / 100;
  const symbol = currency === "EUR" ? "€" : "";
  if (value >= 1000) {
    return `${symbol}${(value / 1000).toFixed(1)}k`;
  }
  return `${symbol}${Math.round(value)}`;
}
