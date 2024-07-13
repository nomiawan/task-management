import { GET_Single_PROJECTS_TASK, PROJECTS_SINGLE_TASK_ERROR } from "../types";

const initialState = {
  projectsSingleTask: [],
  loading: true,
  error: {},
};

export default function projectsSingleTaskReducer(
  state = initialState,
  action: any
) {
  switch (action.type) {
    case GET_Single_PROJECTS_TASK:
      return {
        ...state,
        projectsSingleTask: action.payload,
        loading: false,
      };
    case PROJECTS_SINGLE_TASK_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
