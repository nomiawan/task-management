import { GET_PROJECTS, PROJECTS_ERROR } from "../types";
import axios from "axios";

let url = process.env.REACT_APP_API_KEY;

export const projectsAction = () => async (dispatch: any) => {
  let value = localStorage.getItem("userData");
  let userData = value ? JSON.parse(value) : null;
  console.log("🚀 ~ projectsAction ~ userData:", userData);
  const Headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${userData.token}`,
  };

  try {
    const res = await axios.get(`${url}v1/admin/project`, {
      headers: Headers,
    });
    dispatch({
      type: GET_PROJECTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROJECTS_ERROR,
      payload: error,
    });
  }
};

export const addProjectAction = async (info: any) => {
  let value = localStorage.getItem("userData");
  let userData = value ? JSON.parse(value) : null;
  const Headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${userData.token}`,
  };

  const res = await axios.post(`${url}v1/admin/project`, info, {
    headers: Headers,
  });

  return res;
};

export const updateProjectAction = async (id: any, info: any) => {
  let value = localStorage.getItem("userData");
  let userData = value ? JSON.parse(value) : null;
  const Headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${userData.token}`,
  };
  const res = await axios.put(`${url}v1/admin/project/${id}`, info, {
    headers: Headers,
  });

  return res;
};

export const deleteProject = async (info: any) => {
  let value = localStorage.getItem("userData");
  let userData = value ? JSON.parse(value) : null;
  const Headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${userData.token}`,
  };
  const res = await axios.delete(`${url}v1/admin/project/${info}`, {
    headers: Headers,
  });
  return res;
};
