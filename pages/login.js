import React from 'react';
import { StyleSheet, Text,TextInput,Button,
   View ,KeyboardAvoidingView} from 'react-native';

import {Logginguser,Signupuser,Autherized} from '../redux/actions';
import {connect} from 'react-redux';

console.ignoredYellowBox = ['Setting a timer'];
class login extends React.Component {
  constructor(props){
    super(props);
    this.login = this.login.bind(this);
    this.viewlogin = this.viewlogin.bind(this);
    this.viewsignup = this.viewsignup.bind(this);
    this.gosignup = this.gosignup.bind(this);
    this.state = ({
      ID:'',
      password:'',
      username:'',
      phonenumber:'',
      gosignup:false,
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

  viewsignup = () => (
    <View style={styles.card}>
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
    <TextInput
      style={styles.textinput}
      onChangeText={(username) => this.setState({username})}
      placeholder='Write user name'
      value={this.state.username}
     />
    <TextInput
      style={styles.textinput}
      onChangeText={(phonenumber) => this.setState({phonenumber})}
      placeholder='Write your phonenumber'
      value={this.state.phonenumber}
     />
    <Button
      onPress={this.signup}
      title="Register"
    />
    <Button
      onPress={this.gosignup}
      title="Login"
    />
    </View>
)
gosignup(){this.setState({gosignup:!this.state.gosignup})}
viewlogin = ()=>  (
        <View style={styles.card}>
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
      <Button
        onPress={this.gosignup.bind(this)}
        title="Register"
      />
      </View>
    )

render() {

    return (
    <KeyboardAvoidingView
    keyboardVerticalOffset={Platform.select({ios: 60, android:60})}
    behavior= {(Platform.OS === 'ios')? "padding" : null}
    style={styles.cont}>
      {this.state.gosignup ? this.viewsignup():this.viewlogin()}
    </KeyboardAvoidingView>
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
  },
  card: {
    backgroundColor:'#fff',
    borderWidth:0.5,
    borderRadius:15,
    borderColor:'#bbb',
    margin:10,
    padding:10,
    width:'80%',
    shadow:9,
    justifyContent:'center',
    alignItems:'center',
  },
});

const mapstatetoprops= state => {
  return{
    user:state.auth.user,
    loading: state.auth.loading,
    error: state.auth.error
  };
};

export default connect(mapstatetoprops,{Logginguser,Autherized})(login);
