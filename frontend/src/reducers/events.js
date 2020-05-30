import { GET_EVENTS, EVENTS_ERROR } from '../actions/types';

const initialState = {
  events: [],
  loading: true,
  errors: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EVENTS:
      return {
        ...state,
        events: payload.data,
        loading: false,
      };
    case EVENTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
