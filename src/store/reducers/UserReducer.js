import * as types from '../actions/types';

const UserReducer = (state=undefined, action) => {
    switch (action.type) {

        case types.SET_USER:
            return action.payload;
        
        case types.REMOVE_USER:
            return {user: undefined};
            
        default:
            return {
                ...state,
            };
    }
}
 
export default UserReducer;