import { StatusBar } from 'expo-status-bar';
import React, {createContext, useEffect} from 'react';
import { StyleSheet, Text, View, ScrollView, Button, SafeAreaView, Platform, ImagePickerIOS} from 'react-native';
import Constants from 'expo-constants';
const statusBarHeight = Constants.statusBarHeight;

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {UserContext} from './UserContext';// 유저 콘텍스트 받아온것 

import Home from './View/Home';
import WritingView from './Components/WritingView';
import Login from './View/Login';

export default function App() {
  const user = {
    userCode: 'code1',
    userCookie: 'cookie1', // 초기값 설정
  }//오브젝트 타입 

  return (
    <NavigationContainer>
      <UserContext.Provider value={user}>
        <SafeAreaView style={styles.conatiner}>
          <Stack.Navigator initialRouteName="Login">
              <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
              <Stack.Screen name="Home" component={Home} options={{headerShown: false}}></Stack.Screen>
              <Stack.Screen name="Order" component={WritingView} options={{headerShown: false}}></Stack.Screen>
          </Stack.Navigator>
          <StatusBar barStyle={'light-content'}/>
        </SafeAreaView>
      </UserContext.Provider>
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: '#F7F5F4',
    paddingTop: Platform.OS === 'android' ? statusBarHeight : 0,
  },
}); 