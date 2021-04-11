import React from 'react';
import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from 'react-native';

export default function ThreadItem(props) {
    return (
        <TouchableOpacity style={[styles.container, props.style]} activeOpacity={0.8} onPress={props.onPress}>
            {/* 글을 클릭하면  거래 가능한 페이지로 넘어감*/}
            <View style={styles.profileBox}>
                <View style={styles.profileContainer}>
                    <View style={styles.icon}/> 
                    <View style={styles.profileData}>
                        <Text style={styles.profileName}>{props.name}</Text>
                        <Text style={styles.profileClass}>{props.major}</Text>
                    </View>
                </View>
                <View>
                    {props.isSale ? (
                        <View style={styles.iconSale}>
                            <Text style={styles.saleText}>판매</Text>
                        </View> 
                    ) : (
                        <View style={styles.iconPurchase}>
                            <Text style={styles.saleText}>구매</Text>
                        </View>
                    )}
                </View>
            </View>

            <View style={styles.itemExplains}>
                <View style={styles.bookImageContainer}>
                    <Image style={styles.bookImage}
                        source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}>
                    </Image>
                </View>
                <View style ={styles.bookData}> 
                    <View style={styles.bookName}>
                        <Text style={styles.bookName}>{props.bookName}</Text>
                        <Text>(과목명)</Text>
                    </View>
                        <Text style={styles.bookExplain}>{props.description}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        marginBottom: 3,
        backgroundColor: '#FFF',
    },
    profileBox: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
    },
    profileContainer: {
        flexDirection: 'row',
        paddingBottom: 10,
    },
    icon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#2F3E75',
        marginRight: 10,
    },
    iconSale: {
        marginTop: 5,
        padding: 2.5,
        paddingLeft: 5,
        paddingRight: 5,
        height: 25,
        borderRadius: 5,
        backgroundColor: '#FF0000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconPurchase: {
        marginTop: 5,
        padding: 2.5,
        paddingLeft: 5,
        paddingRight: 5,
        height: 25,
        borderRadius: 5,
        backgroundColor: '#1DDB16',
        alignItems: 'center',
        justifyContent: 'center',
    },
    saleText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 15,
    },
    profileData: {
        justifyContent: 'center',
        marginRight: 10,
    },

    itemExplains: {
        flexDirection: 'row',
    },
    bookImageContainer: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 10,

        shadowColor: '#333',
        shadowOffset: { width: 0, height: 3, },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        
        elevation: 10,
    },
    bookImage: {
        marginLeft: 4,
        marginTop: 4,
        width: 72,
        height: 72,
    },
    bookName: {
        flexDirection: 'row',
        fontSize: 22,
        marginBottom: 2.5,
    },
    bookData: {
        marginTop: 10,
    }, 
    bookExplain:{
        backgroundColor: '#FFEE00',
    },
    profileName:{
        marginBottom: 5,
        fontWeight: 'bold',
        fontSize: 19,
    },
    profileClass: {
        color: '#333',
        fontSize: 19,
    },
    cutline: {
        width: '100%',
        height: 1,
        backgroundColor: '#333',
    }
});