import  {
    LOGIN_ATTEMPT,
    LOGIN_FAILED,
    LOGIN_SUCCESS,
    SIGNUP_ATTEMPT,
    SIGNUP_FAILED,
    SIGNUP_SUCCESS,
    AUTHED
} from '../actions/types';


const initial = {
    loading:false,
    error:'',
    user:{userID:null,email:null,username:null,phonenumber:null,courses:[]},
    fetchcourses:[],
    };




export default (state =initial , action) => {
    switch(action.type){
        case LOGIN_ATTEMPT:
            console.log("you attempt login");
            return {...state , loading:true};

        case LOGIN_FAILED:
            console.log("login failed because : "+action.error);
            return {...state , loading:false , error:action.error};

        case LOGIN_SUCCESS:
            console.log("login succeeded hello " + action.userID);
            return {...state , loading:false , user:action.user};
            case SIGNUP_ATTEMPT:
            console.log("you attempt signup");
            return {...state , loading:true};

        case SIGNUP_FAILED:
            console.log("signup failed because : "+action.error);
            return {...state , loading:false , error:action.error};
        case SIGNUP_SUCCESS:
            console.log("signup succeeded hello "+ action.user.userID);
            return {...state , loading:false,user:action.user};
        case AUTHED:
            return {...state , user:action.user};
        case 'Downloaded':
            return {...state , fetchcourses:action.fetchcourses};
        default:
            return {...state ,user:action.user};
    }
};
