import { GET_Single_PROJECTS_TASK, PROJECTS_SINGLE_TASK_ERROR } from "../types";
import axios from "axios";

let url = process.env.REACT_APP_API_KEY;

export const projectsSingleTaskAction =
  (pId: any, tId: any) => async (dispatch: any) => {
    let value = localStorage.getItem("userData");
    let userData = value ? JSON.parse(value) : null;
    const Headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${userData.token}`,
    };

    try {
      const res = await axios.get(`${url}v1/project/${pId}/task/${tId}`, {
        headers: Headers,
      });
      console.log("🚀 ~ projectsTaskAction ~ res:", res);
      dispatch({
        type: GET_Single_PROJECTS_TASK,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: PROJECTS_SINGLE_TASK_ERROR,
        payload: error,
      });
    }
  };
