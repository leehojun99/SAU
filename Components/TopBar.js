import React from 'react';
import {StyleSheet, View, Text,TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { faBell, faSearch,faQuestion,faPencilAlt } from '@fortawesome/free-solid-svg-icons';
 
export default function TopBar({navigation}) {
    return (
        
        <View style={styles.container}>
            <View style={styles.topContainer}>
                 <Text style={styles.title}>실시간</Text>
                 <View style={styles.QnA}>
                    <FontAwesomeIcon icon={faQuestion} size={30}/>
                 </View>
            </View>
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
    Poststyle: {
        padding: 10,
    },

    post:{
        flexDirection: 'row',
        
    },

    container: {

        marginBottom: 15,
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent:'space-between'
    }, 
    QnA :{
        paddingTop: 15,
        marginRight: 20,
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