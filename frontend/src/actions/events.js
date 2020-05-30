import axios from 'axios';
import { setAlert } from './alert';

import { GET_EVENTS, EVENTS_ERROR } from './types';

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
        type: GET_EVENTS,
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
        type: GET_EVENTS,
        payload: res.data,
      });

      dispatch(setAlert('Events Updated', 'success'));
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

    dispatch(setAlert('Events Successfully Deleted', 'danger'));

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
