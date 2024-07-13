import { GET_COMMENTS, COMMENTS_ERROR } from "../types";
import axios from "axios";

let url = process.env.REACT_APP_API_KEY;

export const commentsAction = (pId: any, tId: any) => async (dispatch: any) => {
  let value = localStorage.getItem("userData");
  let userData = value ? JSON.parse(value) : null;
  const Headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${userData.token}`,
  };

  try {
    const res = await axios.get(`${url}v1/project/${pId}/task/${tId}/comment`, {
      headers: Headers,
    });
    console.log("🚀 ~ projectsTaskAction ~ res:", res);
    dispatch({
      type: GET_COMMENTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: COMMENTS_ERROR,
      payload: error,
    });
  }
};

export const addCommentsAction = async (pId: any, tId: any, info: any) => {
  let value = localStorage.getItem("userData");
  let userData = value ? JSON.parse(value) : null;
  const Headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${userData.token}`,
  };

  const res = await axios.post(
    `${url}v1/project/${pId}/task/${tId}/comment`,
    info,
    {
      headers: Headers,
    }
  );

  return res;
};

// export const updateProjectTaskAction = async (
//   pId: any,
//   tId: any,
//   info: any
// ) => {
//   let value = localStorage.getItem("userData");
//   let userData = value ? JSON.parse(value) : null;
//   const Headers = {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${userData.token}`,
//   };
//   const res = await axios.put(`${url}v1/project/${pId}/task/${tId}`, info, {
//     headers: Headers,
//   });

//   return res;
// };

export const deleteComment = async (pId: any, tId: any, cId: any) => {
  let value = localStorage.getItem("userData");
  let userData = value ? JSON.parse(value) : null;
  const Headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${userData.token}`,
  };
  const res = await axios.delete(
    `${url}v1/project/${pId}/task/${tId}/comment/${cId}`,
    {
      headers: Headers,
    }
  );
  return res;
};
