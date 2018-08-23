import  {
    LOGGED_OUT
} from './types';

import firebase  from 'firebase/app';
import 'firebase/auth';


export const Signoutuser = () => {
    return (dispatch)=>{
        firebase.auth().signOut();
        console.log('you logged out');
        dispatch({type: LOGGED_OUT});
    }
};
