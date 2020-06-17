import axios from 'axios';
import { setAlert } from './alert';

import { GET_PURCHASES, UPDATE_PURCHASES, PURCHASES_ERROR } from './types';

// Get purchases by User
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
