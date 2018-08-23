import {combineReducers} from 'redux';

import Authreducer from './authreducer';
export default combineReducers({
    auth: Authreducer,

});
