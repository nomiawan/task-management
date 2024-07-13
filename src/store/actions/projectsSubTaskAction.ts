import { GET_PROJECTS_TASK, PROJECTS_TASK_ERROR } from "../types";
import axios from "axios";

let url = process.env.REACT_APP_API_KEY;

export const addProjectSubTaskAction = async (id: any, info: any) => {
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
