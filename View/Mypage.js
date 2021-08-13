import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useUserContext } from "../UserContext";

export default function Mypage({ navigation, route }) {
  const { user, setUser } = useUserContext();
  let server = "https://api.saubook.store";
  const [me, setMe] = useState();
  useEffect(() => {
    axios
      .get(server + "/user/me?userToken=" + user) // 서버에서 타임라인 가져오기
      .then(function (response) {
        setMe(response.data[0]); // 내용 뿌려주기
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.Topcontainer}>
          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.LogoutButton}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text>로그 아웃</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.UserInfo}>
            <View>
              <Image
                style={styles.profileIcon}
                source={{
                  uri: me?.profileImage,
                }}
              />
            </View>
            <View>
              <Text>{me?.name}</Text>
              <Text>{me?.major}</Text>
            </View>
          </View>
          <View style={styles.PostErase}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.LogoutButton}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text>글 삭 제</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Topcontainer: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#FFF",
  },
  LogoutButton: {
    justifyContent: "center",
    padding: 10,
  },
  UserInfo: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 0,
  },
  PostErase: {
    justifyContent: "center",

    padding: 0,
  },
  profileIcon: {
    width: 70,
    height: 70,
    borderRadius: 25,
  },
});
