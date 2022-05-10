import { combineReducers } from "redux";
import FavoritesReducer from "./reducers/FavoritesReducer";
import UserReducer from "./reducers/UserReducer";

const rootReducer = combineReducers({
   favorites:FavoritesReducer, 
   user: UserReducer,
});

export default rootReducer;