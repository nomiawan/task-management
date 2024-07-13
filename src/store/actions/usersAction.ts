import { GET_USERS, USERS_ERROR } from "../types";
import axios from "axios";

let url = process.env.REACT_APP_API_KEY;

export const usersAction = () => async (dispatch: any) => {
  let value = localStorage.getItem("userData");
  let userData = value ? JSON.parse(value) : null;
  const Headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${userData.token}`,
  };

  try {
    const res = await axios.get(`${url}v1/admin/user`, {
      headers: Headers,
    });
    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USERS_ERROR,
      payload: error,
    });
  }
};

export const addUserAction = async (info: any) => {
  let value = localStorage.getItem("userData");
  let userData = value ? JSON.parse(value) : null;
  const Headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${userData.token}`,
  };

  const res = await axios.post(`${url}v1/admin/user`, info, {
    headers: Headers,
  });

  return res;
};

export const updateUserAction = async (id: any, info: any) => {
  let value = localStorage.getItem("userData");
  let userData = value ? JSON.parse(value) : null;
  const Headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${userData.token}`,
  };
  const res = await axios.put(`${url}v1/admin/user/${id}`, info, {
    headers: Headers,
  });

  return res;
};

export const deleteUser = async (info: any) => {
  let value = localStorage.getItem("userData");
  let userData = value ? JSON.parse(value) : null;
  const Headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${userData.token}`,
  };
  const res = await axios.delete(`${url}v1/admin/user/${info}`, {
    headers: Headers,
  });
  return res;
};
