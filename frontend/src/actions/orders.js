import axios from 'axios';
import { setAlert } from './alert';

import { GET_ORDERS, ORDER_ERROR } from './types';

// Create order
export const createOrder = (formData, history, userId) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/v1/orders', formData, config);

    dispatch({
      type: GET_ORDERS,
      payload: res.data,
    });
    history.push(`/orders/${userId}`);
    dispatch(setAlert('Ticket successfully purchased', 'success'));
  } catch (err) {
    // const errors = err.response.data.error;

    // if (errors) {
    //   const arr = { errors: errors.split(',') };
    //   arr.errors.map((error) => dispatch(setAlert(error, 'danger')));
    // }

    dispatch({
      type: ORDER_ERROR,
      payload: {
        msg: err.message,
      },
    });
  }
};

// Get order by User
export const getOrderById = (orderId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/orders/${orderId}`);

    dispatch({
      type: GET_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: {
        msg: err.message,
      },
    });
  }
};

// Delete Order
export const deleteOrder = (orderId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/orders/${orderId}`);

    dispatch(setAlert('Ticket Successfully Deleted', 'danger'));

    dispatch({
      type: GET_ORDERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_ERROR,
      payload: {
        msg: err.message,
      },
    });
  }
};
