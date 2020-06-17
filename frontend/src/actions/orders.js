import axios from 'axios';
import { setAlert } from './alert';

import { GET_ORDERS, ORDER_ERROR, UPDATE_ORDERS } from './types';

// Create order
export const createOrder = (formData, history, userId, role) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/v1/orders', formData, config);

    dispatch({
      type: UPDATE_ORDERS,
      payload: res.data,
    });
    dispatch(setAlert('Ticket successfully purchased', 'success'));
    if (role === 'admin') {
      history.push(`/purchases`);
    } else {
      history.push(`/orders/${userId}`);
    }
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
export const getOrderById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/orders/${userId}`);

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
export const deleteOrder = (orderId, userId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/orders/${orderId}/${userId}`);

    dispatch(setAlert('Ticket Successfully Deleted', 'danger'));

    dispatch({
      type: UPDATE_ORDERS,
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
