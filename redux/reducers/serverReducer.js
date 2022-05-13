import {
  ORDER_FAILED,
  CLEAR_MSG_ERROR,
  ORDER_ASSIGNMENT,
  GET_ORDER,
  ORDER_COMPLETED,
  ORDER_DELIVERING,
} from "../actions/Types";

const initialState = {
  order: null,
  msg: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
    case ORDER_ASSIGNMENT:
      return {
        ...state,
        order: action.payload,
      };
    case ORDER_COMPLETED:
    case ORDER_FAILED:
      return {
        ...state,
        order: null,
      };
    case ORDER_DELIVERING:
      return {
        ...state,
        order: { ...state.order, status: "delivering" },
      };
    case CLEAR_MSG_ERROR:
      return {
        ...state,
        msg: null,
        error: null,
      };
    default:
      return state;
  }
}
