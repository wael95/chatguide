import React from 'react';
import { StyleSheet, Text,TextInput,Button, View } from 'react-native';

import {Logginguser,Signupuser,Autherized} from '../redux/actions';
import {connect} from 'react-redux';

console.ignoredYellowBox = ['Setting a timer'];
class login extends React.Component {
  constructor(props){
    super(props);
    this.login = this.login.bind(this);
    this.state = ({
      ID:'',
      password:''
    });
  }
  componentDidMount(){
      this.authListener();
    }
  authListener(){
    this.props.Autherized();
  }
  componentDidUpdate(){
     if(this.props.user){this.props.navigation.navigate('Home');}
  }
  login() {
      console.log(this.state.ID+' '+this.state.password);
      if(this.state.ID!='')
      this.props.Logginguser(this.state.ID,this.state.password);
    }

  render() {

    return (
    <View style={styles.cont}>
        <TextInput
          style={styles.textinput}
          onChangeText={(ID) => this.setState({ID})}
          placeholder='write your ID'
          value={this.state.ID}
        />
      <TextInput
        style={styles.textinput}
        onChangeText={(password) => this.setState({password})}
        placeholder='Write your password'
        value={this.state.password}
        secureTextEntry={true}
      />
      <Button
        onPress={this.login}
        title="Login"
      />
    </View>
    );
  }
}
const styles = StyleSheet.create({
  textinput: {
    height: 40,
    width:200,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
  },
  cont:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  }
});

const mapstatetoprops= state => {
  return{
    user:state.auth.user,
    loading: state.auth.loading,
    error: state.auth.error
  };
};

export default connect(mapstatetoprops,{Logginguser,Autherized})(login);
