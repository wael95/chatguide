
import  {
    LOGIN_ATTEMPT,
    LOGIN_FAILED,
    LOGIN_SUCCESS
} from './types';

import firebase  from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const User ={
        userID:null,
        email:null,
        username:null,
        phonenumber:null,
        courses:[]
    };

export const Logginguser = (ID,password) => {

    let email = ID + '@ksu.edu.sa';
    return (dispatch)=>{
        dispatch({type: LOGIN_ATTEMPT});
         firebase.auth().signInWithEmailAndPassword(email, password)
        .then((u)=>{
            User.email = u.user.email;
            User.userID = ID;

            login_Success(dispatch, User);
        })
        .catch((error) => {
            login_Failed(dispatch,error.message);
          });
    };
};

const login_Failed = (dispatch,errormessage) => {
    dispatch({type: LOGIN_FAILED, error:errormessage});
};

const login_Success = (dispatch,user) => {
    dispatch({type: LOGIN_SUCCESS , user:user});
};
