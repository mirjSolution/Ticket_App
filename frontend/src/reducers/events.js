import {
  GET_EVENTS,
  EVENTS_ERROR,
  ADD_QUANTITY_VIP,
  ADD_QUANTITY_GA,
  SUB_QUANTITY_GA,
  SUB_QUANTITY_VIP,
  EVENT_TOTAL,
  CLEAR_EVENT_QTY_TOTAL,
  UPDATE_EVENTS,
} from '../actions/types';

const initialState = {
  events: [],
  loading: true,
  errors: {},
  quantityVIP: 0,
  quantityGA: 0,
  total: 0,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_EVENTS:
    case UPDATE_EVENTS:
      return {
        ...state,
        events: payload.data,
        loading: false,
      };
    case ADD_QUANTITY_VIP:
      return {
        ...state,
        quantityVIP:
          state.events.vipQty === state.quantityVIP
            ? state.quantityVIP
            : state.quantityVIP + 1,
        total:
          state.quantityGA * state.events.general +
          state.quantityVIP * state.events.vip,
      };
    case ADD_QUANTITY_GA:
      return {
        ...state,
        quantityGA:
          state.events.genQty === state.quantityGA
            ? state.quantityGA
            : state.quantityGA + 1,
        total:
          state.quantityGA * state.events.general +
          state.quantityVIP * state.events.vip,
      };
    case SUB_QUANTITY_VIP:
      return {
        ...state,
        quantityVIP:
          state.quantityVIP === 0 ? state.quantityVIP : state.quantityVIP - 1,
        total:
          state.quantityGA * state.events.general +
          state.quantityVIP * state.events.vip,
      };
    case SUB_QUANTITY_GA:
      return {
        ...state,
        quantityGA:
          state.quantityGA === 0 ? state.quantityGA : state.quantityGA - 1,
        total:
          state.quantityGA * state.events.general +
          state.quantityVIP * state.events.vip,
      };

    case EVENT_TOTAL:
      return {
        ...state,
        total:
          state.quantityGA * state.events.general +
          state.quantityVIP * state.events.vip,
      };
    case EVENTS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case CLEAR_EVENT_QTY_TOTAL:
      return {
        ...state,
        quantityVIP: 0,
        quantityGA: 0,
        total: 0,
      };
    default:
      return state;
  }
}
