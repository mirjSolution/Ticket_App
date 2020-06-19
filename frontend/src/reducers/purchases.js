import {
  UPDATE_PURCHASES,
  PURCHASES_ERROR,
  GET_PURCHASES,
} from '../actions/types';

const initialState = {
  purchases: [],
  loading: true,
  validity: 'valid',
  errors: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PURCHASES:
    case UPDATE_PURCHASES:
      return {
        ...state,
        purchases: payload.data,
        validity: payload.data[0].validity,
        loading: false,
      };
    case PURCHASES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    default:
      return state;
  }
}
