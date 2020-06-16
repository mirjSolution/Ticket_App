import axios from 'axios';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  FORGOT_SUCCESS,
  FORGOT_ERROR,
  RESET_SUCCESS,
  RESET_ERROR,
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/v1/auth/me');

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register USer
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/v1/auth/register', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
    dispatch(setAlert('User successfully registered', 'success'));
  } catch (err) {
    const errors = err.response.data.error;

    if (errors) {
      const arr = { errors: errors.split(',') };
      arr.errors.map((error) => dispatch(setAlert(error, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login USer
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/v1/auth/login', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.error;

    if (errors) {
      const arr = { errors: errors.split(',') };
      arr.errors.map((error) => dispatch(setAlert(error, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Forgot User
export const forgot = (email, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email });

  try {
    const res = await axios.post('/api/v1/auth/forgot', body, config);
    dispatch({
      type: FORGOT_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert('Check your email to resest the password', 'success'));
    history.push('/login');
  } catch (err) {
    const errors = err.response.data.error;

    if (errors) {
      const arr = { errors: errors.split(',') };
      arr.errors.map((error) => dispatch(setAlert(error, 'danger')));
    }

    dispatch({
      type: FORGOT_ERROR,
    });
  }
};

// Reset Password User
export const reset = (password, resettoken, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ password });

  try {
    const res = await axios.put(
      `/api/v1/auth/reset/${resettoken}`,
      body,
      config
    );
    dispatch({
      type: RESET_SUCCESS,
      payload: res.data,
    });

    dispatch(setAlert('Password successfully changed'));
    history.push('/login');
  } catch (err) {
    const errors = err.response.data.error;

    if (errors) {
      const arr = { errors: errors.split(',') };
      arr.errors.map((error) => dispatch(setAlert(error, 'danger')));
    }

    dispatch({
      type: RESET_ERROR,
    });
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
