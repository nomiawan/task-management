import { GET_PROJECTS_TASK, PROJECTS_TASK_ERROR } from "../types";
import axios from "axios";

let url = process.env.REACT_APP_API_KEY;

export const projectsTaskAction = (id: any) => async (dispatch: any) => {
  let value = localStorage.getItem("userData");
  let userData = value ? JSON.parse(value) : null;
  const Headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${userData.token}`,
  };

  try {
    const res = await axios.get(`${url}v1/project/${id}/task`, {
      headers: Headers,
    });
    console.log("🚀 ~ projectsTaskAction ~ res:", res);
    dispatch({
      type: GET_PROJECTS_TASK,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROJECTS_TASK_ERROR,
      payload: error,
    });
  }
};

export const addProjectTaskAction = async (id: any, info: any) => {
  let value = localStorage.getItem("userData");
  let userData = value ? JSON.parse(value) : null;
  const Headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${userData.token}`,
  };

  const res = await axios.post(`${url}v1/project/${id}/task`, info, {
    headers: Headers,
  });

  return res;
};

export const updateProjectTaskAction = async (
  pId: any,
  tId: any,
  info: any
) => {
  let value = localStorage.getItem("userData");
  let userData = value ? JSON.parse(value) : null;
  const Headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${userData.token}`,
  };
  const res = await axios.put(`${url}v1/project/${pId}/task/${tId}`, info, {
    headers: Headers,
  });

  return res;
};

export const deleteProjectTask = async (pId: any, tId: any) => {
  let value = localStorage.getItem("userData");
  let userData = value ? JSON.parse(value) : null;
  const Headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${userData.token}`,
  };
  const res = await axios.delete(`${url}v1/project/${pId}/task/${tId}`, {
    headers: Headers,
  });
  return res;
};
