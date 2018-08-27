import React from 'react';
import {View, Text, StyleSheet, TextInput, FlatList,
    Platform, Keyboard,ActivityIndicator,
    TouchableHighlight, KeyboardAvoidingView } from 'react-native';

import {connect} from 'react-redux';
import {sendmessage} from '../redux/actions';

import firebase  from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class chatpage extends React.Component {

  constructor(props){
    super(props);
    this.props.navigation.setParams({ title: 'your content' });
    this.renderChatItem = this.renderChatItem.bind(this);
    this.fetchmessages = this.fetchmessages.bind(this);
    console.log(this.props.navigation.state.params.pagename);
    this.state = {
            messages: [ ],
            disabled: false,
            text:''
        };
  };
  componentDidMount(){
    this.fetchmessages();
  }
  onSendBtnPressed () {
      if(this.state.text!='')
      this.props.sendmessage(this.state.text,this.props.user.username,this.props.navigation.state.params.pagename);
      this.setState({text:''});
      this.textInput.clear();
      Keyboard.dismiss();
  };
  renderChatItem =({item})=> {
      return   <View >
                {this.props.user.username!==item.sender ?
                <View style={styles.elsemessage}>
                  <Text style={styles.message}>{item.sender} </Text>
                  <Text style={styles.message}>{item.text} </Text>
                </View>
                :
                <View style={styles.mymessage}>
                  <Text style={styles.message}>{item.text}</Text>
                </View>}
                </View>;
  };
  fetchmessages(){
     firebase.database().ref('messages/'+this.props.navigation.state.params.pagename).on('value',(snapshot)=>{
        const M = [];
        if(snapshot.val())
        Object.values(snapshot.val()).forEach(msg =>{
          M.unshift(msg);
        });
        this.setState({messages : M});
      });
  };
  _keyExtractor = (item, index) => item.id;
  render() {

    return (
    <View style={styles.container}>
    <FlatList
      inverted
      data={this.state.messages}
      renderItem={({item}) => this.renderChatItem({item})}
      keyExtractor={this._keyExtractor}
      extraData={this.state}
    />
      <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.select({ios: 60, android:60})}
            behavior= {(Platform.OS === 'ios')? "padding" : null}
            >
          <View style={styles.inputBar}>
            <TextInput
                style={styles.textBox}
                multiline
                onChangeText={(text) => this.setState({text})}
                ref={input => { this.textInput = input; } }
            />
            <TouchableHighlight
                style={styles.sendBtn}
                disabled={this.state.disabled}
                onPress={this.onSendBtnPressed.bind(this)}
            >
              <Text style={{ color: '#fff'}}>Send</Text>
            </TouchableHighlight>
        </View>
      </KeyboardAvoidingView>
    </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
        flex: 1
    },
    inputBar: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        paddingVertical: 10,
        backgroundColor: '#dadfea',
    },
    textBox: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        fontSize: 14,
        paddingHorizontal: 10,
        flex: 1,
        paddingVertical: 5,
        marginLeft: 5,
        backgroundColor: '#fff',
    },
    sendBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        marginLeft: 5,
        backgroundColor: '#476DC5',
    },
    message: {
      fontSize:17,
      color:'#0f0f0f',
    },
    mymessage: {
      margin:7,marginLeft:'30%',
      borderRadius:10,
      padding:9,
      backgroundColor:'#03ff96',
      justifyContent:'center',
      // alignItems:'flex-end',
    },
    elsemessage: {
      margin:7,marginRight:'30%',
      borderRadius:10,
      padding:9,
      backgroundColor:'#fafbfc',
      justifyContent:'center',
      alignItems:'flex-start',
    }

  });

const mapstatetoprops= state => {
  return{
    user: state.auth.user,
  };
};
export default connect(mapstatetoprops,{sendmessage})(chatpage);
