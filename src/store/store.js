import { createStore } from "redux";
import { storage } from "../utils";
import rootReducer from './rootReducer';

const store= createStore(rootReducer);


store.subscribe(() => {
    console.log("subscribe calisti");
    console.log(store.getState().user);
    console.log("subscribe calisti2");
    storage.setFavorites(store.getState().favorites.favList);
});

export default store;