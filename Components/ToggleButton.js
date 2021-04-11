import React, {useState} from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ToggleButton (props){
    const [value, setValue] = useState(0);

    return(
        <View style={[styles.container, props.styles]}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => {props.onChangeValue(0);}} style={[styles.left, (props.value ==0)? styles.selected: styles.unSelected]}>
                <Text styles={(props.value ==0)? styles.selectedText: styles.unSelectedText}>{props.item[0]}</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => {props.onChangeValue(1);}} style={[styles.right, (props.value ==1)? styles.selected: styles.unSelected]}>
                <Text styles={(props.value ==1)? styles.selectedText: styles.unSelectedText}>{props.item[1]}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles =StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
    },
    selected: {
        backgroundColor: '#34a1eb',
        padding: 10,
    },
    selectedText: {
        flex: 1,
        color: '#FFFFFF',
        fontSize: 30,
    },
    unSelected: {
        backgroundColor: '#FFFFFF',
        padding: 10,

    },
    unSelectedText: {
        color: '#34a1eb',
        
    },

    left: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    right: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    }
});