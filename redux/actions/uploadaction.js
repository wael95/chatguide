
import firebase  from 'firebase/app';
import 'firebase/auth';


const User ={
        username:null,
        userID:null,
        email:null,
        courses:[]
    };

export const upload = (COURSES=[],NAME) => {
    
    return (dispatch)=>{
      firebase.auth().onAuthStateChanged((u) => {
      if (u) {
        User.email = u.email;
        User.userID = u.displayName;
        User.courses = COURSES;
        User.name = NAME;
        console.log(User);
        upload_data(dispatch,u.displayName);
      } 
      else {
        console.log("you'r NOT autherized ");
      }
    });
    };
};

const upload_data= (dispatch,userId) =>{
  
  firebase.database().ref('users/' + User.userID).set(User);
  
};