import { combineReducers } from "redux";
import { currencyConvertionReducer } from "./currencyConvertionReducer";
import { currencySymbolsReducer } from "./currencySymbolsReducer";
import { exchangeRatesReducer } from "./exchangeRatesReducer";

const reducer = combineReducers({
  currencyConvertion: currencyConvertionReducer!,
  currencySymbols: currencySymbolsReducer!,
  exchangeRates: exchangeRatesReducer!,
});

export default reducer;
