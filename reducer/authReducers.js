import { AUTHENTICATION,DEAUTHENTICATION } from '../constants/constants';
const authReducer = (state= {token : ''}, action) => {
    switch (action.type){
        case AUTHENTICATION:
            return { ...state, token: action.payload };
        case DEAUTHENTICATION:
            return { token: null };
        default:
            return state;
    }
}

export default authReducer