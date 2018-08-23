import React from 'react';
import { StyleSheet,Text, View } from 'react-native';
import {connect} from 'react-redux';


class selectcourse extends React.Component {
  render() {
    return (
    <View >
        <Text style={styles.add}> this is selectpage </Text>
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
  });

const mapstatetoprops= state => {
  return{
    user: state.auth.user,
  };
};
export default connect(mapstatetoprops,{})(selectcourse);
