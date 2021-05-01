import React, { Component, useState, useContext, useEffect }from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { faUserAlt, faKey } from '@fortawesome/free-solid-svg-icons'
import { StyleSheet, View, Text,TextInput,TouchableOpacity, SafeAreaView, Linking } from 'react-native';

import {useUserContext} from "../UserContext.js";
import axios from 'axios';

export default function Login ({navigation}){
  const [id, setID] = useState(''); //변수 ,함수 선언 방식 인데 그냥 외우면된다고함 
  const [password, setPassword] = useState('');
  const {user, setUser} = useUserContext();

  let server = 'https://api.saubook.store'; //도메인 주소  바뀔 일 없음 .

  function login() {
    axios.get(server + '/auth/login?userId=' + id + '&userPassword=' + password) //로그인 주소로 보내는것//
    .then(function (response){
      if (response.data["isLogin"] == true) {
        setUser(response.data["token"]);
        // userContext({userCode: response.data["token"], userCookie: user.userCookie});
        // 로그인 성공
        
        navigation.navigate('Home');

      } else {
        alert('로그인 실패');
      } // 로그인 시도한 값이 맞는지 확인 하는것 (쿠키 형식으로 서버에서 받아서 확인함 )
    })
  }

  useEffect(() => {
      
  })

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>SAU</Text>
        </View>
        <View style={styles.tool}>
          <View style={styles.idContainer}>
            <View style={styles.inputContainer}>
              <FontAwesomeIcon icon={faUserAlt} size={20}/>
              <TextInput
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="ID"
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                onChangeText={(text) => {setID(text);}}
              />
            </View>
            
            <View style={styles.bottomBar}/>
          </View>
          <View style={styles.passContainer}>
            <View style={styles.inputContainer}>
              <FontAwesomeIcon icon={faKey} size={20}/>
              <TextInput
                secureTextEntry={true} // 패스워드 암호화
                onSubmitEditing={() => {
                  login();
                }}
                style={styles.input}
                underlineColorAndroid="transparent"
                placeholder="Password"
                placeholderTextColor="#9a73ef"
                autoCapitalize="none"
                onChangeText={(text) => {setPassword(text);}}
              />
            </View>
            <View style={styles.bottomBar}/>
          </View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              // navigation.navigate('Home');
              login();
              
            }}
          >
            <Text style={styles.submitButtonText}>로그인</Text>
          </TouchableOpacity>
          <View > 
            <Text style={styles.help}
              onPress={() => {
                Linking.openURL('https://sso.sau.ac.kr/?confirmHak=true');
              }}  
            >계정이 기억나지 않으신가요?</Text>
          </View>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    margin: 30,
    position: 'absolute',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    margin: 10,
    marginLeft: 20,
    height: 40,
  },
  bottomBar: {
    marginLeft: 30,
    marginRight: 30,
    height: 1,
    backgroundColor: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    marginLeft: 40,
    padding: 0,
    marginRight: 30,
    alignItems: 'center',
  },
  passContainer: {
    marginBottom: 35,
  },
  submitButton: {
    backgroundColor: "#7a42f4",
    margin: 10,
    marginLeft: 30,
    marginRight: 30,
    padding: 15,
    borderRadius: 100,
  },
  submitButtonText: {
    color: "white",
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tool: {
    flex: 1,
    justifyContent: 'center',
  },
  help:{
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign : 'center'
  }
});