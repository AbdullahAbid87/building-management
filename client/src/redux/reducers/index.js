import { combineReducers } from "redux";
import User from "./User";
import Admin from "./Admin";
import Manager from "./Manager";

export default combineReducers({
  User: User,
  Admin: Admin,
  Manager: Manager,
});
