import * as types from '../actions/types';


const initialState = {
    favList: [],
}

const FavoriteReducer = (state=[], action) => {
    switch (action.type) {

        case types.ADD_FAV:
            return  [...state, action.payload];

        
        case types.REMOVE_FAV:
            return state.filter(fav => action.payload !== fav.id);

        case types.SET_FAVS:
            return action.payload || [];
            
        default:
            return state;
    }
}
 
export default FavoriteReducer;