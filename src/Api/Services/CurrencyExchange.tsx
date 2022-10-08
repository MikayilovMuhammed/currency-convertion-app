import { HttpClient } from "../HttpClient";

class CurrencyExchangeService extends HttpClient {
  constructor() {
    super("https://api.apilayer.com/currency_data");
  }

  getCurrencyConverter(to: string, from: string, amount: string | number) {
    return this.get(`convert?to=${to}&from=${from}&amount=${amount}`);
  }
  getCurrencySymbols() {
    return this.get("list");
  }
  getCurrentExchangeRates(source: string, currencies: string) {
    return this.get(`live?source=${source}&currencies=${currencies}`);
  }
}
export const currencyExchangeService = new CurrencyExchangeService();
