
import firebase  from 'firebase/app';
import 'firebase/auth';

const pages =[];

export const downloade = () => {
      
    return (dispatch)=>{
       firebase.database().ref('pages/').on('value',(snapshot) =>{
        let i = 0;
        Object.keys(snapshot.val()).map(function(w){
         pages[i]= {label: snapshot.val()[w] , value:snapshot.val()[w] };
         i++;
        });
        if(pages)
        dispatch({type: 'Downloaded' , fetchcourses:pages});
       });
    };
};

