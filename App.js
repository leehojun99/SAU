import { StatusBar } from "expo-status-bar";
import React, { createContext, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  SafeAreaView,
  Platform,
  ImagePickerIOS,
} from "react-native";
import Constants from "expo-constants";
const statusBarHeight = Constants.statusBarHeight;

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { UserProviderContext } from "./UserContext"; // 유저 콘텍스트 받아온것

import Myposting from "./View/Myposting";
import Mypage from "./View/Mypage";
import Home from "./View/Home";
import Login from "./View/Login";
import Post from "./View/Post";
import Order from "./View/Order";
import SearchBook from "./View/SearchBook";

const tabBarOptions = {
  tabStyle: {
    justifyContent: "center",
  },
  style: {
    height: 84,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
};

const MainTab = () => {
  return (
    <Tab.Navigator tabBarOptions={tabBarOptions} initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomePageNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPageNavigator}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

const HomePageNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Post"
        component={Post}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Order"
        component={Order}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchBook"
        component={SearchBook}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const MyPageNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyPage"
        component={Mypage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Myposting"
        component={Myposting}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <UserProviderContext>
        <SafeAreaView style={styles.conatiner}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Main"
              component={MainTab}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
          <StatusBar barStyle={"light-content"} />
        </SafeAreaView>
      </UserProviderContext>
    </NavigationContainer>
  );
}

const Stack =
  createStackNavigator(); /*창이 넘어가는게 아니라 스택형식으로 위에쌓인다*/

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: "#F7F5F4",
    paddingTop:
      Platform.OS === "android"
        ? statusBarHeight
        : 0 /*안드로이드랑 ios 에서 상단바 보이는게 달라서 같게 보이도록 수정*/,
  },
});
