import {
  ADD_LOGIN,
  ADD_LOGIN_ERROR,
  ADD_LOGIN_SUCCESS,
  LOG_OUT,
} from "../types";

let initialState = {
  login: [],
  loginLoading: true,
  successMessage: null,
  error: null,
};

export default function addLoginReducer(state = initialState, action: any) {
  switch (action.type) {
    case ADD_LOGIN:
      return {
        ...state,
        login: action.payload,
        successMessage: action.payload,
        loginLoading: false,
        error: null,
      };
    case ADD_LOGIN_ERROR:
      return {
        data: [],
        loginLoading: false,
        successMessage: null,
        error: action.payload,
      };
    // case LOG_OUT:
    //   return {
    //     ...state,
    //     login: action.payload,
    //   };
    default:
      return state;
  }
}
