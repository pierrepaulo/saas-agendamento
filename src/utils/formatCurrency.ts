const CURRENCY_FORMATTER = Intl.NumberFormat("pt-BR", {
  currency: "brl",
  style: "currency",
  minimumFractionDigits: 0,
});

export function formatCurrency(number: number) {
  return CURRENCY_FORMATTER.format(number);
}
