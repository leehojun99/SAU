import React,  { Component, useRef, useContext, useState, createRef } from 'react';
import { StyleSheet, View, Text, Image, ScrollView,CheckBox, TextInput, TouchableOpacity } from 'react-native';

import ToggleButton from '../Components/ToggleButton';
import {useUserContext} from '../UserContext';
import axios from 'axios';

export default function Post({navigation}){
    const { user, setUser } = useUserContext();
    let server = 'https://api.saubook.store'; //도메인 주소  바뀔 일 없음 .

    const posting = () => {
        console.log( 'userCode : ' + user);
        axios.post(server + '/post?token=' + user + '&bookToken=ae7344375719d25ced899e440e37565973a2a46c&isSell=' + sellValue + '&description='+ content +'&major=11&price=' + priceValue + '&image_token=')
        .then(function(response) {
            navigation.navigate('Home');
        }) 
    }
    
    const [value, onChangeText] = React.useState();
    const [content, onChangeContent] = useState('');
    const [priceValue, onChangePrice] = useState(0); 
    const [majorValue, setMajorValue] = useState(0);
    const [sellValue, setSellValue] = useState(false);
    return (
        <View > 
            <View style={styles.Posttop}>
            <TouchableOpacity activeOpacity={0.8} style={styles.goBack} onPress={() => {navigation.goBack()}}>
                <Text style={styles.goBackText}>뒤로가기</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.Ok} onPress={posting}>
                <Text style={styles.Oktext}>작성완료</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.pofileContainer}>
                <View style={styles.profile}>
                    <View style={styles.Icon}>
                        <View style={styles.profileIcon}/>
                    </View>
                    <View style={styles.Icon}>
                        <Text>SalerName :</Text>
                        <Text>major:</Text>
                    </View>
                </View>
            </View>
             
            <View style={styles.CheckArea}> 
                <Image style={styles.bookImage}
                        source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}>
                </Image> 
                <View style={styles.rightContainer}>        
                    <View style={styles.Check}>
                            <ToggleButton styles={{margin: 5}} item={['판매', '구매']} value={sellValue} onChangeValue={setSellValue}/>                 
                    </View>  
                    <View style={styles.Bookname} >
                            <View style={styles.inputContainer}>
                                <TextInput placeholder={"책 이름"} style={{backgroundColor:'white' , flex: 1, padding: 5,}} onChangeText={text => onChangeText(text)} value={value}/>
                            </View>
                    </View> 
                    <View style={styles.money}>
                         <TextInput placeholder={"가격 "} style={{backgroundColor:'white' , flex: 1, padding: 5,}} onChangeText={text => onChangePrice(text)} value={priceValue}/>
                    </View>  
                     
                </View>
            </View>  
            <TextInput placeholder={"글 내용"} style={styles.bookinfo} onChangeText={text => onChangeContent(text)} value={content} /> 
                
        </View>
    );
 
}
const styles = StyleSheet.create({
    Posttop:{
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    pofileContainer:{
        flexDirection: 'row',
        paddingBottom: 10,
    },
    profile: {
        flexDirection: 'row',
        flex : 1,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        marginBottom: 3,
        backgroundColor: '#FFF',
    },
    Icon:{
        justifyContent:'center',
        
    },
    profileIcon:{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#2F3E75',
        marginRight: 10,
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'space-around',
    },
    bookImage: {
        marginLeft: 4,
        marginTop: 4,
        width: 110,
        height: 110,
    },
    Bookname:{
        flexDirection:'row',
        alignItems: 'center',
        marginLeft:10,
       
    },
    input: {
        flex: 1,
        margin: 10,
        marginLeft: 20,
        height: 40,
      },
      Check:{
        flexDirection:'row',
        justifyContent: 'space-around',
        marginLeft:10,
      },
    
    CheckArea:{
        
        flexDirection: 'row',
        
        marginTop:10,
    },
    goBack: {
        padding: 10,
    },
    goBackText: {
        paddingLeft: 15,
        fontSize: 20,
    },
    Oktext: {
        paddingRight: 10,
        fontSize: 20,
    },
    Ok:{
        padding:10,
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 10,
        padding: 0,
        marginTop:5,
        marginRight: 30,
        alignItems: 'center',
    },
    bookinfo:{
        margin: 20,
        paddingBottom: 150,
        backgroundColor: '#FFFFFF',
    },
    money:{
        flex: 1,
        flexDirection: 'row',
        marginLeft: 20,
        padding: 0,
        marginRight: 30,
        marginTop:5,
        alignItems: 'center',
    }
});