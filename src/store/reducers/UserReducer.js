import * as types from '../actions/types';


const initialState = {
    user: {},
}

const UserReducer = (state=initialState.user, action) => {
    switch (action.type) {

        case types.SET_USER:
            return {
                ...state,
                user: action.payload
            };
        
        case types.REMOVE_USER:
            return {
                ...state,
                user: undefined
            }
            
        default:
            return {
                ...state,
            };
    }
}
 
export default UserReducer;