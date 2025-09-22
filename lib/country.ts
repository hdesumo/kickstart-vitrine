export const COUNTRIES = [
  { code: "CM", name: { fr: "Cameroun", en: "Cameroon" }, currency: "XAF" },
  { code: "SN", name: { fr: "Sénégal", en: "Senegal" },   currency: "XOF" },
  { code: "NG", name: { fr: "Nigeria",  en: "Nigeria" },  currency: "NGN" },
  { code: "GH", name: { fr: "Ghana",    en: "Ghana" },    currency: "GHS" },
] as const;

export const CURRENCIES = ["XAF","XOF","NGN","GHS","EUR","USD"] as const;

export const CURRENCY_FORMAT: Record<string, Intl.NumberFormatOptions & {symbol:string}> = {
  USD: { style: "currency", currency: "USD", symbol: "$" },
  EUR: { style: "currency", currency: "EUR", symbol: "€" },
  XAF: { style: "currency", currency: "XAF", symbol: "FCFA" },
  XOF: { style: "currency", currency: "XOF", symbol: "FCFA" },
  NGN: { style: "currency", currency: "NGN", symbol: "₦" },
  GHS: { style: "currency", currency: "GHS", symbol: "₵" },
};
