import { GET_USERS, USERS_ERROR } from "../types";

const initialState = {
  users: [],
  loading: true,
  error: {},
};

export default function usersReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case USERS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
