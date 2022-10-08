import { ACTION_TYPES } from "../actions/types";
import { IAction } from "../interface/action";

const initialState = {
  status: "",
  data: [] || {},
  errors: [],
  isLoading: false,
};
export function currencyConvertionReducer(
  state = initialState,
  action: IAction
) {
  switch (action.type) {
    case `${ACTION_TYPES.GET_CURRENCY_CONVERTER}_PENDING`:
      return {
        ...state,
        status: "PENDING",
        isLoading: true,
      };

    case `${ACTION_TYPES.GET_CURRENCY_CONVERTER}_SUCCESS`:
      return {
        ...state,
        status: "SUCCESS",
        isLoading: false,
        data: action.payload,
      };

    case `${ACTION_TYPES.GET_CURRENCY_CONVERTER}_ERROR`:
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
