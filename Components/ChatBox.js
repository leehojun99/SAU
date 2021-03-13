import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

export default function ChatBox(props) {
    return(
        <View style={[styles.container, (props.isMe ? (styles.meContainer) : (styles.otherContainer))]}>
            {props.isMe ? (<View/>):(
                <Image style={styles.icon}
                    source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}>
                </Image>
            )}
            <View style={[styles.textContainer, (props.isMe ? (styles.me) : (styles.other))]}>
                <Text style={(props.isMe ? (styles.me) : (styles.other))}>{props.Text}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginRight: 20,
        marginBottom: 10,
    },
    meContainer: {
        alignSelf: 'flex-end',
    },
    otherContainer: {
        flexDirection: 'row',
    },
    textContainer: {
        padding: 10,
        borderRadius: 10,
        marginBottom: 0,
    },
    icon: {
        width: 35,
        height: 35,
        borderRadius: 20,
        backgroundColor: '#2F3E75',
        marginRight: 10,
    },
    other: {
        backgroundColor: '#FF00FF',
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 0,
    }, 
    me: {
        backgroundColor: '#FFFF00',
        textAlign: 'right',
        borderBottomRightRadius: 0,
    }
    
});