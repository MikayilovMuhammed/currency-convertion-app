import { ACTION_TYPES } from "../actions/types";
import { IAction } from "../interface/action";

const initialState = {
  status: "",
  data: [] || {},
  errors: [],
  isLoading: false,
};
export function exchangeRatesReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case `${ACTION_TYPES.GET_CURRENCY_EXCHANGE}_PENDING`:
      return {
        ...state,
        status: "PENDING",
        isLoading: true,
      };

    case `${ACTION_TYPES.GET_CURRENCY_EXCHANGE}_SUCCESS`:
      return {
        ...state,
        status: "SUCCESS",
        isLoading: false,
        data: action.payload,
      };

    case `${ACTION_TYPES.GET_CURRENCY_EXCHANGE}_ERROR`:
      return {
        ...state,
        status: "ERROR",
        isLoading: false,
        errors: [...action.errors],
      };
    default:
      return state;
  }
}
