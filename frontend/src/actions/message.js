import axios from 'axios';
import { MESSAGE_ERROR, MESSAGE_SUCCESS } from './types';

export const sendMessage = (user, order_name) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const res = await axios.post(
      '/api/v1/sendmessage',
      user,
      order_name,
      config
    );
    dispatch({
      type: MESSAGE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);

    dispatch({
      type: MESSAGE_ERROR,
      payload: {
        msg: err.message,
      },
    });
  }
};
