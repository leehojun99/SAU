import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';


export default function WritingView(){
    return(
    <View>
        <View style={styles.container}>
            <View style={styles.saleArea}>
                <View>

                </View>
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
            <View style={styles.chatBoxP}>
                <View styles={styles.areaPuchaser}>
                    <View>

                    </View>
                    <View>
                        <Text style={styles.chatPurchaser}>구매자대화상자</Text>
                    </View>
                </View>
            </View>
            <View style={styles.chatBoxS}>
                <View styles={styles.areaSeller}>
                    <View>

                    </View>
                    <View>
                        <Text style={styles.chatSeller}>판매자대화상자</Text>
                    </View>
                </View>
            </View>
        </View>

    </View>
    );
}




const styles = StyleSheet.create({
    container :{
        
    },
    areaPuchaser:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    areaSeller:{
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    chatBoxS: {
        marginTop: 5,
        padding: 2.5,
        paddingLeft: 5,
        paddingRight: 5,
        width:150,
        height: 40,
        borderRadius: 5,
        backgroundColor: '#00D8FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    chatBoxP: {
        marginTop: 5,
        padding: 2.5,
        paddingLeft: 5,
        paddingRight: 5,
        width: 150,
        height: 40,
        borderRadius: 5,
        backgroundColor: '#FFE400',
        alignItems: 'center',
        justifyContent: 'center',
    },
    chatPurchaser:{
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20,
    },
    chatSeller:{
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 20,
    },
    chatBox:{
        flexDirection: 'row',
        flex : 1,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        marginBottom: 3,
        backgroundColor :'#B7F0B1'
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