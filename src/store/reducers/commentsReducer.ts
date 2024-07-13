import { GET_COMMENTS, COMMENTS_ERROR } from "../types";

const initialState = {
  comments: [],
  loading: true,
  error: {},
};

export default function commentsReducer(state = initialState, action: any) {
  switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };
    case COMMENTS_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}
