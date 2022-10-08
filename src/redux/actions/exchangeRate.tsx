import { currencyExchangeService } from "../../Api/Services/CurrencyExchange";
import { ACTION_TYPES } from "./types";

export const getLatestExchangeRate =
  (source: string, currencies: string) => (dispatch: Function) => {
    dispatch({
      type: `${ACTION_TYPES.GET_CURRENCY_CONVERTER}_PENDING`,
    });

    currencyExchangeService
      .getCurrentExchangeRates(source, currencies)
      .then(({ data }) => {
        dispatch({
          type: `${ACTION_TYPES.GET_CURRENCY_EXCHANGE}_SUCCESS`,
          payload: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: `${ACTION_TYPES.GET_CURRENCY_EXCHANGE}_ERROR`,
          errors: [err],
        });
      });
  };
