import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import TopBar from '../Components/TopBar';
import ThreadItem from '../Components/ThreadItem';

const func23 = () => {
    alert('123123123123', 'asdf');
};


function func1(int a, b) {
    returna + b; 
}

export default function Home({navigation}) {
    return(
        <View>
            <TopBar/>
            <ScrollView>
                <ThreadItem onPress={() => {navigation.navigate('Order')}} name={"이름123"} major={"컴정"} isSale={false}/>
                <ThreadItem onPress={() => {alert('123123')}} name={"이름456"} major={"경호"} isSale={true}/>
                <ThreadItem name={"이름789"} major={"멀티"} isSale={false}/>
                <ThreadItem name={"이름012"} major={"기계"} isSale={true}/>
                <ThreadItem name={"이름345"} major={"전자"} isSale={false}/>
                <ThreadItem name={"이름678"} major={"회계"} isSale={true}/>
                <ThreadItem name={"이름901"} major={"기계"} isSale={false}/>
            </ScrollView>
        </View> 
    );
}

