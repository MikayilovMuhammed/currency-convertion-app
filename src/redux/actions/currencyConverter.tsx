import { currencyExchangeService } from "../../Api/Services/CurrencyExchange";
import { ACTION_TYPES } from "./types";

export const getCurrencyConverter =
  (to: string, from: string, amount: string | number) =>
  (dispatch: Function) => {
    dispatch({
      type: `${ACTION_TYPES.GET_CURRENCY_CONVERTER}_PENDING`,
    });

    currencyExchangeService
      .getCurrencyConverter(to, from, amount)
      .then(({ data }) => {
        dispatch({
          type: `${ACTION_TYPES.GET_CURRENCY_CONVERTER}_SUCCESS`,
          payload: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: `${ACTION_TYPES.GET_CURRENCY_CONVERTER}_ERROR`,
          errors: [err],
        });
      });
  };
