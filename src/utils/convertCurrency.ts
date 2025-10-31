export function converteRealToCentes(amount: string) {
  const numericPrice = parseFloat(amount.replace(/\./g, "").replace(",", "."));
  const priceInCents = Math.round(numericPrice * 100);
  return priceInCents;
}
