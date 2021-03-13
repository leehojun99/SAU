import React from 'react';
import { SafeAreaView, StyleSheet, View, Text, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';

import ChatBox from './ChatBox';

export default function WritingView(props){
    return(
    <SafeAreaView style={styles.container}>
        <View>
            <TouchableOpacity activeOpacity={0.8} style={styles.goBack} onPress={() => {props.navigation.goBack()}}>
                <Text style={styles.goBackText}>뒤로가기</Text>
            </TouchableOpacity>
            <View style={styles.saleArea}>
                <View>
                    <View style={styles.iconSale}>
                        <Text style={styles.saleText}>판매</Text>
                    </View>
                    <View style={styles.iconPurchase}>
                        <Text style={styles.saleText}>구매</Text>
                    </View>
                </View>   
            </View>
            <View>
                <Image style={styles.bookImage}
                            source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}>
                </Image>
            </View>
        
        </View>
        <View>
            <Text style={styles.bookfont}>도서명 :  ......</Text>
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
        
        <View style={styles.chatBox}>
            <ScrollView style={styles.chatScroll}>
                <ChatBox isMe={false} Text={"상대"} />
                <ChatBox isMe={false} Text={"상대"} />
                <ChatBox isMe={false} Text={"상대"} />
                <ChatBox isMe={true} Text={"나"} />
                <ChatBox isMe={false} Text={"상대"} />
                <ChatBox isMe={true} Text={"나"} />
                <ChatBox isMe={false} Text={"상대"} />
                <ChatBox isMe={true} Text={"나"} />
                <ChatBox isMe={false} Text={"상대"} />
                <ChatBox isMe={true} Text={"나"} />
                <ChatBox isMe={false} Text={"상대"} />
                <ChatBox isMe={true} Text={"나"} />
                <ChatBox isMe={false} Text={"상대"} />
                <ChatBox isMe={true} Text={"나"} />
                <ChatBox isMe={false} Text={"상대"} />
                <ChatBox isMe={true} Text={"나"} />
                <ChatBox isMe={false} Text={"상대"} />
                <ChatBox isMe={true} Text={"나"} />
            </ScrollView>
            <View style={styles.chatInputContainer}>
                <TextInput style={styles.chatInput}></TextInput>
                <View style={styles.sendButton}>
                    <Text>전송</Text>
                </View>
            </View>
        </View>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
    },
    goBack: {
        padding: 10,
    },
    goBackText: {
        fontSize: 20,
    },
    chatInputContainer: {
        flexDirection:'row',
    },
    chatBox:{
        flex: 1,
        margin: 0,
        paddingTop: 15,
        paddingLeft: 20,
        paddingRight: 0,
        paddingBottom: 20,
        marginBottom: 3,
        backgroundColor :'#B7F0B1'
    },
    chatScroll: {
        marginBottom: 10,
    },
    sendButton: {
        marginRight: 20,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        padding: 5,
        borderRadius: 10,
    },
    chatInput: {
        flex: 1,
        borderRadius: 20,
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom: 0,
        marginRight: 10,
        backgroundColor: '#FFF',
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
    saleArea:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    bookImage: {
        marginLeft: 4,
        marginTop: 4,
        width: 100,
        height: 100,
    },
    iconPurchase: {
        marginTop: 5,
        padding: 2.5,
        paddingLeft: 5,
        paddingRight: 5,
        width: 80,
        height: 40,
        borderRadius: 5,
        backgroundColor: '#1DDB16',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconSale: {
        marginTop: 5,
        padding: 2.5,
        paddingLeft: 5,
        paddingRight: 5,
        width: 80,
        height: 40,
        borderRadius: 5,
        backgroundColor: '#FF0000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    saleText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20,
    },
    bookfont : {
        fontWeight: 'bold',
        fontSize: 30,
    }



});