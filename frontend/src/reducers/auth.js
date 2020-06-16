import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  FORGOT_SUCCESS,
  FORGOT_ERROR,
  RESET_ERROR,
  RESET_SUCCESS,
  LOGOUT,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  role: null,
  email: null,
  name: null,
  userId: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        role: payload.data.role,
        email: payload.data.email,
        name: payload.data.name,
        userId: payload.data._id,
      };

    case FORGOT_SUCCESS:
    case RESET_SUCCESS:
      return {
        ...state,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case RESET_ERROR:
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case FORGOT_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        role: null,
        email: null,
        name: null,
        userId: null,
      };
    default:
      return state;
  }
}
