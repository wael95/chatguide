import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


//redux
import Reducers from './redux/reducers';
import {connect} from 'react-redux';
import {Autherized} from './redux/actions';

//pages
import Route from './Route';
import Login from './pages/login';


class Assembly extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
      this.authListener();
    }
  authListener(){
    this.props.Autherized();
  }
  render() {

    return (
      <View>
      {false ?  this.props.navigation.navigate('Home'):this.props.navigation.navigate('Login')}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  textinput: {
    height: 40,width:200,
  },

});

const mapstatetoprops= state => {
  return{
    user: state.auth.user,
    loading : 'fjhskhf'
  };
};

export default connect(mapstatetoprops,{Autherized})(Assembly);
