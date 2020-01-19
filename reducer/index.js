import { combineReducers }  from 'redux';
import  foo from './foo';
import  auth from './authReducers';

const rootReducer = combineReducers({
    foo: foo,
    authentication: auth
});

export default rootReducer