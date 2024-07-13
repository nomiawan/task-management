import { GET_ASSIGNED_PROJECTS, ASSIGNED_PROJECTS_ERROR } from "../types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

let url = process.env.REACT_APP_API_KEY;

export const assignedProjectsAction = () => async (dispatch: any) => {
  let value = localStorage.getItem("userData");
  let userData = value ? JSON.parse(value) : null;
  const Headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${userData.token}`,
  };

  try {
    const res = await axios.get(`${url}v1/project`, {
      headers: Headers,
    });
    dispatch({
      type: GET_ASSIGNED_PROJECTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ASSIGNED_PROJECTS_ERROR,
      payload: error,
    });
  }
};

export const updateProjectAssignAction = async (pId: any, info: any) => {
  let value = localStorage.getItem("userData");
  let userData = value ? JSON.parse(value) : null;
  const Headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${userData.token}`,
  };
  const res = await axios.post(`${url}v1/admin/project/${pId}/assign`, info, {
    headers: Headers,
  });

  return res;
};
