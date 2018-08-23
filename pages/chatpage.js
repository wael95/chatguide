import React from 'react';
import {View, Text, StyleSheet, TextInput, FlatList,
    Platform, Keyboard,ActivityIndicator,
    TouchableHighlight, KeyboardAvoidingView } from 'react-native';

import {connect} from 'react-redux';


class chatpage extends React.Component {

  constructor(props){
    super(props);
    this.props.navigation.setParams({ title: 'your content' })
    console.log(this.props.navigation.state.params.pagename);
    this.state = {
            text: '',
            disabled: false
        }
  }


  onSendBtnPressed () {
      this.textInput.clear();
      Keyboard.dismiss();
  }
  renderChatItem({ item }) {
      return <ChatItem message={item} />
  }

  keyExtractor = (item, index) => index;


  render() {
    return (
    <View style={styles.container}>

      <FlatList
          inverted
          data={this.props.messages}
          renderItem={this.renderChatItem}
          keyExtractor={this.keyExtractor}
      />

      <KeyboardAvoidingView keyboardVerticalOffset={Platform.select({ios: 30, android: 15})}
            behavior= {(Platform.OS === 'ios')? "padding" : null}>
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
        justifyContent: 'space-between',
        paddingHorizontal: 5,
        paddingVertical: 10,
        backgroundColor: '#dadfea'
    },
    textBox: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray',
        fontSize: 14,
        paddingHorizontal: 10,
        flex: 1,
        paddingVertical: 5,
        marginLeft: 5
    },
    sendBtn: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        marginLeft: 5,
        backgroundColor: '#476DC5'
    },
  
  });

const mapstatetoprops= state => {
  return{
    user: state.auth.user,
  };
};
export default connect(mapstatetoprops,{})(chatpage);
