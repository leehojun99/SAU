import React,  { Component, useRef, useState, createRef } from 'react';
import { StyleSheet, View, Text, Image, ScrollView,CheckBox, TextInput, TouchableOpacity } from 'react-native';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

import ToggleButton from '../Components/ToggleButton';

export default function Post({navigation}){
    const [value, onChangeText] = React.useState('0000000');
    const [majorValue, setMajorValue] = useState(0);
    const [sellValue, setSellValue] = useState(0);
    return (
        
        <View > 
            <View style={styles.Posttop}>
            <TouchableOpacity activeOpacity={0.8} style={styles.goBack} onPress={() => {navigation.goBack()}}>
                <Text style={styles.goBackText}>뒤로가기</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.Ok} onPress={() => {navigation.navigate('Home')}}>
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
                        
                            <ToggleButton styles={{margin: 5}} item={['전공', '교양']} value={majorValue} onChangeValue={setMajorValue}/>
                            
                            <ToggleButton styles={{margin: 5}} item={['판매', '구매']} value={sellValue} onChangeValue={setSellValue}/>
                            
                    </View>  
                    <View style={styles.Bookname} >
                            <View style={styles.inputContainer}>
                                <TextInput placeholder={"책 이름"} style={{backgroundColor:'white' , flex: 1, padding: 5,}} onChangeText={text => onChangeText(text)} value={value}/>
                            </View>
                    </View>   
                </View>
            </View>  
            <TextInput placeholder={"글 내용"} style={styles.bookinfo} onChangeText={text => onChangeText(text)} value={value} /> 
                
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
        width: 100,
        height: 100,
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
        marginRight: 30,
        alignItems: 'center',
    },
    bookinfo:{
        margin: 20,
        paddingBottom: 150,
        backgroundColor: '#FFFFFF',
    },
});