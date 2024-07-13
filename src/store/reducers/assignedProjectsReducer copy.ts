import { GET_ASSIGNED_PROJECTS, ASSIGNED_PROJECTS_ERROR } from "../types";

const initialState = {
  assignedProjects: [],
  loading: true,
  error: {},
};

export default function assignedProjectsReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_ASSIGNED_PROJECTS:
      return {
        ...state,
        assignedProjects: action.payload,
        loading: false,
      };
    case ASSIGNED_PROJECTS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
