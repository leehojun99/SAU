import React, {useState, useEffect} from 'react';
import { StyleSheet, View, ScrollView, Alert, Text, TouchableOpacity, RefreshControl } from 'react-native';
import axios from 'axios';

import TopBar from '../Components/TopBar';
import ThreadItem from '../Components/ThreadItem';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { faBell, faSearch,faQuestion,faPencilAlt, faAlignCenter } from '@fortawesome/free-solid-svg-icons'

export default function Home({navigation}) {


  let server = 'https://api.saubook.store'; //도메인 주소  바뀔 일 없음 .
  const [threadItems,setThreadItems] = useState([{"name":"김소현","major":"호텔 조리","title":"조리학","description":"조리학 책 구매 희망","isSell":true,"imageUrl":"https://~~!!"},
                       {"name":"이호준","major":"컴정","title":"네트워크","description":"판매 합니다","isSell":false,"imageUrl":"https://~~!!"},
                       {"name":"김명조","major":"멀티미디어","title":"행복한 가정만들기","description":"교양 책 구매","isSell":true,"imageUrl":"https://~~!!"},
                       {"name":"아바타","major":"경호","title":"채픔","description":"채플책 삽니다.","isSell":true,"imageUrl":"https://~~!!"},
                       {"name":"인지훈","major":"기계","title":"기계 공학","description":"기계 공학 책 판매","isSell":false,"imageUrl":"https://~~!!"},
                       {"name":"신인성","major":"예체능","title":"스포츠 농구","description":"스포츠 농구 책 판매","isSell":false,"imageUrl":"https://~~!!"}]);

  const [refreshing, setRefreshing] = React.useState(false);

  const reloadTimeline = React.useCallback(() => {
    setRefreshing(true); // 새로고침 시작
    axios.get(server + '/post/live?page=1') // 서버에서 타임라인 가져오기
    .then(function (response){
      console.log(response.data); // 내용 뿌려주기
      setThreadItems(response.data);
      setRefreshing(false); // 새로고칢 끝남
    });
  }, []); // 새로고침 실시간

  return (
      <View style={{flex: 1}}>
          <TopBar navigation={navigation} reload={reloadTimeline}/>
          <ScrollView refreshControl={
            <RefreshControl
            refreshing={refreshing}
            onRefresh={reloadTimeline}
          />
          }>
            {threadItems.map((item, index) => (
              <ThreadItem onPress={() => {navigation.navigate('Order')}} name={item.name} major={item.major} isSale={!item.isSell} title={item.title} description={item.description}/>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.post} activeOpacity={0.8} onPress={() => {navigation.navigate('Post')}} >
              <FontAwesomeIcon style={styles.postIcon} icon={faPencilAlt} size={30}/>
          </TouchableOpacity>
      </View> 
  );
    
}

const styles = StyleSheet.create({
  post: {
    flex : 1,
    flexDirection: 'row',
    right: 20,
    bottom: 20,
    borderRadius: 50,
    width: 75,
    height: 75,
    backgroundColor: '#FFF',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.25,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 8,

  },
  postIcon: {

  }
})