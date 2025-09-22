export function formatCurrency(value:number, code:string, locale:"fr"|"en"="fr"){
  return new Intl.NumberFormat(locale, { style:"currency", currency: code }).format(value);
}

// conversion naïve (ex: taux depuis env)
const RATES = {
  // 1 USD = X unit
  USD: 1,
  EUR: 0.92,
  XAF: 610,
  XOF: 610,
  NGN: 1550,
  GHS: 15.5,
};

export function convertFromUSD(usd:number, target:string){
  const r = RATES[target as keyof typeof RATES] ?? 1;
  return usd * r;
}
