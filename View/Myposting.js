import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from "react-native";

import ThreadItem from "../Components/ThreadItem";
import { useUserContext } from "../UserContext.js";

export default function Myposting({ navigation, route }) {
  let server = "https://api.saubook.store"; //도메인 주소  바뀔 일 없음 .
  const { user, setUser } = useUserContext();

  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    reloadTimeline();
  }, [lastPage]);

  useEffect(() => {
    //if (threadItems.length == 0) reloadTimeline();
    //console.log(filterData);
  }); //처음 들가면 화면 새로고침

  const settingFilter = (filterData) => {
    setRefreshing(true); // 새로고침 시작
    setFilter(filterData);

    if (filterData.token != "")
      axios
        .get(server + "/post/search?type=token&token=" + filterData.token) // 서버에서 타임라인 가져오기
        .then(function (response) {
          console.log(response.data); // 내용 뿌려주기
          setThreadItems(response.data);
          setRefreshing(false); // 새로고침 끝남
        });
    else
      axios
        .get(server + "/post/live?page=" + lastpage) // 서버에서 타임라인 가져오기
        .then(function (response) {
          console.log(response.data); // 내용 뿌려주기
          setThreadItems(response.data);
          setRefreshing(false); // 새로고칢 끝남
        });
  };

  const [threadItems, setThreadItems] = useState([]);
  const [lastCalledThreadItem, setLastCalledThreadItem] = useState(0);
  const [filterData, setFilter] = useState({ token: "" });

  const [refreshing, setRefreshing] = React.useState(false);

  const reloadTimeline = () => {
    setRefreshing(true); // 새로고침 시작
    console.log(server + "/user/myposts?userToken=" + user);
    axios
      .get(server + "/user/myposts?userToken=" + user + "&page=" + lastPage) // 서버에서 타임라인 가져오기
      .then(function (response) {
        console.log(response.data); // 내용 뿌려주기
        setThreadItems(threadItems.concat(response.data));
        setLastCalledThreadItem(response.data.length);
        setRefreshing(false); // 새로고칢 끝남
      });
  }; // 새로고침 실시간

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.TopContainer}>
        <Text style={styles.Topfont}>Myposting</Text>
      </View>

      <View reload={reloadTimeline} filter={settingFilter} />
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={reloadTimeline} />
        }
        contentContainerStyle={{ paddingBottom: 100 }}
        data={threadItems}
        renderItem={({ item }) => {
          return (
            <ThreadItem
              onPress={() => {
                navigation.navigate("Order", { item: item });
              }}
              name={item.name}
              major={item.major}
              isSale={!item.isSell}
              title={item.title}
              description={item.description}
              price={item.price}
              imageUri={item.imageUri}
            />
          );
        }}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (lastCalledThreadItem != 0) setLastPage(lastPage + 1);
        }}
      ></FlatList>
    </View>
  );
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  TopContainer: {
    padding: 10,
    width: 180,
    height: 80,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginLeft: 30,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "red",
  },
  Topfont: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
