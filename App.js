import React from 'react';
import {StyleSheet, Text, View } from 'react-native';

import Assembly from './Assembly'
import Route from './Route';

//fire base
import {config}  from './fire';
import firebase from 'firebase/app';

//redux
import Reducers from './redux/reducers';
import { createStore, applyMiddleware, combineReducers, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(Reducers);


class App extends React.Component {
  constructor(props){
    super(props);
    this.app = firebase.initializeApp(config);
  }
  render() {
    return (
      <Provider store={store} >
        <Route/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  containor:{
    flex:1,
    backgroundColor:'#D9E3D6'
  }
});

export default App;
