import { combineReducers } from "redux";
import User from "./User";
import Admin from "./Admin";

export default combineReducers({
  User: User,
  Admin: Admin,
});
