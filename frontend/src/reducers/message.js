import { MESSAGE_ERROR, MESSAGE_SUCCESS } from '../actions/types';

const initialState = {
  message: [],
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case MESSAGE_SUCCESS:
      return {
        ...state,
        message: payload.data,
      };
    case MESSAGE_ERROR:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
}
