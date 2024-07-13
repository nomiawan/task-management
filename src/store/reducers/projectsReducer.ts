import { GET_PROJECTS, PROJECTS_ERROR } from "../types";

const initialState = {
  projects: [],
  loading: true,
  error: {},
};

export default function projectsReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loading: false,
      };
    case PROJECTS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
