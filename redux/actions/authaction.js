import  {
    AUTHED
} from './types';

import firebase  from 'firebase/app';
import 'firebase/auth';


const User ={
        userID:null,
        email:null,
        username:null,
        phonenumber:null,
        courses:[]
    };

export const Autherized = () => {

    return (dispatch)=>{
      firebase.auth().onAuthStateChanged((u) => {
      if (u) {
        console.log("you'r autherized ");
        User.email = u.email;
        User.userID = u.displayName;
        retrieve_data(dispatch,u.displayName);

      } else {
        console.log("you'r NOT autherized ");
        dispatch({type: AUTHED , user:null});
      }
    });
    };
};

const retrieve_data= (dispatch,userId) =>{
  firebase.database().ref('users/' + userId).on('value',(snapshot) =>{
    console.log(snapshot.val());
    if(snapshot.val()){
    User.username = snapshot.val().name || userId;
    User.courses = snapshot.val().courses||[];}
    else{
      User.username = userId;
    }
    dispatch({type: AUTHED , user:User});
  });

};
