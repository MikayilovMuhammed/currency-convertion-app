// getLatestExchangeRate

import { currencyExchangeService } from "../../Api/Services/CurrencyExchange";
import { ACTION_TYPES } from "./types";

export const getCurrencySymbols = () => (dispatch: Function) => {
  dispatch({
    type: `${ACTION_TYPES.GET_CURRENCY_SYMBOLS}_PENDING`,
  });

  currencyExchangeService
    .getCurrencySymbols()
    .then(({ data }) => {
      dispatch({
        type: `${ACTION_TYPES.GET_CURRENCY_SYMBOLS}_SUCCESS`,
        payload: data,
      });
    })
    .catch((err) => {
      dispatch({
        type: `${ACTION_TYPES.GET_CURRENCY_SYMBOLS}_ERROR`,
        errors: [err],
      });
    });
};
