import React from 'react';
import { StyleSheet, TouchableOpacity,Text, View,Button } from 'react-native';
import {connect} from 'react-redux';
import {Signoutuser} from '../redux/actions';


class home extends React.Component {
  constructor(props) {
		  super(props);
		  this.logout = this.logout.bind(this);
      this.goPage = this.goPage.bind(this);
      this.goAdd = this.goAdd.bind(this);
	 }
  logout(){
    this.props.Signoutuser();
    this.props.navigation.navigate('Login');
  }

  goPage(element){
    this.props.navigation.navigate('Chatpage',{pagename:element});
  }
  goAdd(e){
    this.props.navigation.navigate('Selectcourse');
  }

  allcourses = () => this.props.user.courses.map((element, i) =>
  <TouchableOpacity key={i} onPress={()=>this.goPage(element)} style={styles.item}>
  <Text > {element} </Text>
  </TouchableOpacity>);

  render() {
    return (
    <View >
        {this.props.user ?this.allcourses():null}
        <TouchableOpacity style={styles.add} onPress={this.logout}>
        <Text style={{fontSize:40,color:'#b0adad'}}>+</Text>
        </TouchableOpacity>

    </View>
    );
  }
}

const styles = StyleSheet.create({
  add:{
    alignItems:'center',
    justifyContent:'center',
    height:50,
  },
  item:{
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    height:50,
    justifyContent:'center',
    backgroundColor:'white'
  }
});

const mapstatetoprops= state => {
  return{
    user: state.auth.user,
  };
};
export default connect(mapstatetoprops,{Signoutuser})(home);
