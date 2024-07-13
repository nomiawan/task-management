import { ADD_LOGIN, ADD_LOGIN_ERROR, LOG_OUT } from "../types";
import { Dispatch } from "redux";
import axios from "axios";
let url = process.env.REACT_APP_API_KEY;
console.log("🚀 ~ url:", url)

export const addLogin = async (info: any) => {
  const Headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer 123",
  };
  
  const res = await axios.post(`${url}v1/login`, info, {
    headers: Headers,
  });

  return res;
};

export const addRegister = async (info: any) => {
  const Headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer 123",
  };
  const res = await axios.post(`${url}v1/register`, info, {
    headers: Headers,
  });

  return res;
};

// export const LogOut = () => (dispatch) => {
//   dispatch({
//     type: LOG_OUT,
//     payload: [],
//   });
// };
