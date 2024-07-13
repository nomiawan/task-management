import { combineReducers } from "redux";
import addLoginReducer from "./AddLoginReducer";
import projectsReducer from "./projectsReducer";
import usersReducer from "./usersReducer";
import projectsTaskReducer from "./projectsTaskReducer";
import projectsSingleTaskReducer from "./projectsSingleTaskReducer";
import commentsReducer from "./commentsReducer";
import assignedProjectsReducer from "./assignedProjectsReducer copy";

export default combineReducers({
  loginData: addLoginReducer,
  projectsList: projectsReducer,
  usersList: usersReducer,
  projectsTaskList: projectsTaskReducer,
  projectsSingleTaskList: projectsSingleTaskReducer,
  commentsList: commentsReducer,
  assignedProjectsList: assignedProjectsReducer,
});
