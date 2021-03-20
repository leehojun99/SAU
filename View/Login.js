import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { faUserAlt, faKey } from '@fortawesome/free-solid-svg-icons'
import React, { Component }from 'react';
import { StyleSheet, View, Text, Image, Button,TextInput,TouchableOpacity, SafeAreaView, Linking } from 'react-native';

export default class Inputs extends Component {
  state = {
    id: "",
    password: ""
  };

  handID = text => {
    this.setState({ id: text });
  };

  handPassword = text => {
    this.setState({ password: text });
  };

  login = (id, pass) => {
    alert("ID :" + id + "\nPassword :" + pass);
  };

  render() {
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
                  onChangeText={this.handID}
                />
              </View>
              
              <View style={styles.bottomBar}/>
            </View>
            <View style={styles.passContainer}>
              <View style={styles.inputContainer}>
                <FontAwesomeIcon icon={faKey} size={20}/>
                <TextInput
                  style={styles.input}
                  underlineColorAndroid="transparent"
                  placeholder="Password"
                  placeholderTextColor="#9a73ef"
                  autoCapitalize="none"
                  onChangeText={this.handPassword}
                />
              </View>
              <View style={styles.bottomBar}/>
            </View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => this.login(this.state.id, this.state.password)}
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