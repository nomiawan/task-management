import { GET_PROJECTS_TASK, PROJECTS_TASK_ERROR } from "../types";

const initialState = {
  projectsTask: [],
  loading: true,
  error: {},
};

export default function projectsTaskReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_PROJECTS_TASK:
      return {
        ...state,
        projectsTask: action.payload,
        loading: false,
      };
    case PROJECTS_TASK_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
