import axios from 'axios';
import { setAlert } from './alert';

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
} from './types';

// Get event by ID
export const getEventById = (eventId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/events/${eventId}`);

    dispatch({
      type: GET_EVENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EVENTS_ERROR,
      payload: {
        msg: err.message,
      },
    });
  }
};

// Get all events
export const getEvents = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/events');

    dispatch({
      type: GET_EVENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EVENTS_ERROR,
      payload: { msg: err.message, status: err.status },
    });
  }
};

// Create or update event
export const createEvent = (formData, history, edit = false, eventId) => async (
  dispatch
) => {
  if (!edit) {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.post('/api/v1/events', formData, config);

      dispatch({
        type: UPDATE_EVENTS,
        payload: res.data,
      });

      dispatch(setAlert('Events Created', 'success'));
      history.push('/dashboard');
    } catch (err) {
      const errors = err.response.data.error;

      if (errors) {
        const arr = { errors: errors.split(',') };
        arr.errors.map((error) => dispatch(setAlert(error, 'danger')));
      }

      dispatch({
        type: EVENTS_ERROR,
        payload: {
          msg: err.message,
        },
      });
    }
  } else if (edit) {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.put(
        `/api/v1/events/${eventId}`,
        formData,
        config
      );

      dispatch({
        type: UPDATE_EVENTS,
        payload: res.data,
      });

      dispatch(setAlert('Events Updated', 'success'));
      history.push('/dashboard');
    } catch (err) {
      const errors = err.response.data.error;

      if (errors) {
        const arr = { errors: errors.split(',') };
        arr.errors.map((error) => dispatch(setAlert(error, 'danger')));
      }

      dispatch({
        type: EVENTS_ERROR,
        payload: {
          msg: err.message,
        },
      });
    }
  }
};

// Delete Event
export const deleteEvent = (eventId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/events/${eventId}`);
    dispatch({
      type: UPDATE_EVENTS,
      payload: res.data,
    });

    dispatch(setAlert('Events Successfully Deleted', 'danger'));
  } catch (err) {
    dispatch({
      type: EVENTS_ERROR,
      payload: {
        msg: err.message,
      },
    });
  }
};

// event add vip
export const addQuantityVip = (quantity) => async (dispatch) => {
  dispatch({
    type: ADD_QUANTITY_VIP,
    payload: quantity,
  });
};

// event add ga
export const addQuantityGA = (quantity) => async (dispatch) => {
  dispatch({
    type: ADD_QUANTITY_GA,
    payload: quantity,
  });
};

// event sub vip
export const subQuantityVIP = (quantity) => async (dispatch) => {
  dispatch({
    type: SUB_QUANTITY_VIP,
    payload: quantity,
  });
};

// event sub ga
export const subQuantityGA = (quantity) => async (dispatch) => {
  dispatch({
    type: SUB_QUANTITY_GA,
    payload: quantity,
  });
};

// event total
export const eventTotal = (total) => async (dispatch) => {
  dispatch({
    type: EVENT_TOTAL,
    payload: total,
  });
};

// clear event quantity and total

export const clearEventQtyTotal = () => async (dispatch) => {
  dispatch({
    type: CLEAR_EVENT_QTY_TOTAL,
  });
};
