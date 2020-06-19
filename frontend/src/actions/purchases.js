import axios from 'axios';
import { setAlert } from './alert';

import { GET_PURCHASES, UPDATE_PURCHASES, PURCHASES_ERROR } from './types';

// Get purchases
export const getPurchases = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/purchases`);

    dispatch({
      type: GET_PURCHASES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PURCHASES_ERROR,
      payload: {
        msg: err.message,
      },
    });
  }
};

// update ticket
export const updateTicket = (ticketId, validity) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ validity });

    const res = await axios.put(`/api/v1/reader/${ticketId}`, body, config);

    dispatch({
      type: GET_PURCHASES,
      payload: res.data,
    });

    dispatch(setAlert('Ticket status updated', 'success'));
  } catch (err) {
    const errors = err.response.data.error;

    if (errors) {
      const arr = { errors: errors.split(',') };
      arr.errors.map((error) => dispatch(setAlert(error, 'danger')));
    }

    dispatch({
      type: PURCHASES_ERROR,
      payload: {
        msg: err.message,
      },
    });
  }
};

// Get ticket id for reader
export const getTicketId = (ticketId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/reader/${ticketId}`);

    dispatch({
      type: GET_PURCHASES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PURCHASES_ERROR,
      payload: {
        msg: err.message,
      },
    });
  }
};

// Delete Purchase
export const deletePurchase = (purchaseId, history) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/purchases/${purchaseId}`);

    dispatch(setAlert('Ticket Successfully Deleted', 'danger'));
    history.push('/purchases');
    dispatch({
      type: UPDATE_PURCHASES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PURCHASES_ERROR,
      payload: {
        msg: err.message,
      },
    });
  }
};
