import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Alert,
  Text,
  TouchableOpacity,
  RefreshControl,
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

  useEffect(() => {
    if (threadItems.length == 0) reloadTimeline();
    console.log(filterData);
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
        .get(server + "/post/live?page=1") // 서버에서 타임라인 가져오기
        .then(function (response) {
          console.log(response.data); // 내용 뿌려주기
          setThreadItems(response.data);
          setRefreshing(false); // 새로고칢 끝남
        });
  };

  const [threadItems, setThreadItems] = useState([]);
  const [filterData, setFilter] = useState({ token: "" });

  const [refreshing, setRefreshing] = React.useState(false);

  const reloadTimeline = React.useCallback(() => {
    setRefreshing(true); // 새로고침 시작
    axios
      .get(server + "/post/live?page=1") // 서버에서 타임라인 가져오기
      .then(function (response) {
        console.log(response.data); // 내용 뿌려주기
        setThreadItems(response.data);
        setRefreshing(false); // 새로고칢 끝남
      });
  }, []); // 새로고침 실시간

  return (
    <View style={{ flex: 1 }}>
      <TopBar
        navigation={navigation}
        reload={reloadTimeline}
        filter={settingFilter}
      />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={reloadTimeline} />
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {threadItems.map((item, index) => (
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
        ))}
      </ScrollView>
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
