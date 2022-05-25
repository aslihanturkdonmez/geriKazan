import * as types from './types';


export const addFav = (fav) => {
    return {
        type: types.ADD_FAV,
        payload: fav
    }
};

export const removeFav = (id) => {
    return {
        type: types.REMOVE_FAV,
        payload: id,
    }
}

export const setFavs = (favs) => {
    return {
        type: types.SET_FAVS,
        payload: favs
    }
};