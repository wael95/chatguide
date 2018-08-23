import { createStackNavigator } from 'react-navigation';


//pages
import Home from './pages/home';
import Login from './pages/login';
import Selectcourse from './pages/selectcourse';
import Chatpage from './pages/chatpage';


const Route = createStackNavigator({
  Login:{
    screen: Login,
    navigationOptions:{
      title:'Login'
    }
  },
  Home: {
    screen: Home,
    navigationOptions:{
      title:'Home',
      headerLeft: null,
      gesturesEnabled: false,

    }
  },
  Selectcourse:{
    screen: Selectcourse,
    navigationOptions:{
      title:'Selectcourse'
    }
  },
  Chatpage:{
    screen: Chatpage,
    navigationOptions:{
      title:'Chatpage'
    }
  },
});

export default Route;
