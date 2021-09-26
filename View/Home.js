import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  Text,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from "react-native";
import axios from "axios";

import TopBar from "../Components/TopBar";
import ThreadItem from "../Components/ThreadItem";

import { createBottomTab } from "@react-navigation/bottom-tabs";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBell,
  faSearch,
  faQuestion,
  faPencilAlt,
  faAlignCenter,
} from "@fortawesome/free-solid-svg-icons";

export default function Home({ navigation, route }) {
  let server = "https://api.saubook.store"; //도메인 주소  바뀔 일 없음 .
  const [lastPage, setLastPage] = useState(1);
  useEffect(() => {
    // if (threadItems.length == 0) reloadTimeline();
    // console.log(filterData);
  }); //처음 들가면 화면 새로고침

  useEffect(() => {
    reloadTimeline();
  }, [lastPage]);

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
        .get(server + "/post/live?page=" + lastPage) // 서버에서 타임라인 가져오기
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
    console.log("reloading " + server + "/post/live?page=" + lastPage);

    axios
      .get(server + "/post/live?page=" + lastPage) // 서버에서 타임라인 가져오기
      .then(function (response) {
        // console.log(response.data); // 내용 뿌려주기
        setThreadItems(threadItems.concat(response.data));
        setLastCalledThreadItem(response.data.length);
        setRefreshing(false); // 새로고칢 끝남
      });
  }; // 새로고침 실시간

  return (
    <View style={{ flex: 1 }}>
      <TopBar
        navigation={navigation}
        reload={() => {
          setLastPage(1);
          setThreadItems([]);
        }}
        filter={settingFilter}
      />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setLastPage(1);
              setThreadItems([]);
            }}
          />
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
      <TouchableOpacity
        style={styles.post}
        activeOpacity={0.8}
        onPress={() => {
          navigation.navigate("Post");
        }}
      >
        <Text style={styles.postIcon}>✏️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    flex: 1,
    flexDirection: "row",
    right: 20,
    bottom: 20,
    borderRadius: 50,
    width: 75,
    height: 75,
    backgroundColor: "#FFF",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
  },
  postIcon: {
    fontSize: 30,
  },
});
