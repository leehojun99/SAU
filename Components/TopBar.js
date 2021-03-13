import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { faBell, faSearch } from '@fortawesome/free-solid-svg-icons'
 
export default function TopBar() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>실시간</Text>
            <View style={styles.toolBar}>
                <View style={styles.search}>
                    <FontAwesomeIcon icon={faSearch} size={30}/>
                    <Text style={styles.searchText}>검색</Text>
                </View>
                <FontAwesomeIcon icon={faBell} size={30}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
    },
    title: {
        padding: 20,
        paddingBottom: 15,
        fontSize: 30,
        fontWeight: 'bold',
    },
    toolBar: {
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    search: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchText: {
        paddingLeft: 10,
        fontSize :17,
        fontWeight: "bold",
    }

});