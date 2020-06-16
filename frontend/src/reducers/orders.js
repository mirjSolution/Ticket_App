import { ORDER_ERROR, GET_ORDERS, UPDATE_ORDERS } from '../actions/types';

const initialState = {
  orders: [],
  loading: true,
  errors: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ORDERS:
    case UPDATE_ORDERS:
      return {
        ...state,
        orders: payload.data,
        loading: false,
      };
    case ORDER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
