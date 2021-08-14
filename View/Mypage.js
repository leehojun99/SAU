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
      <View style={styles.Topcontainer}>
        <Text style={styles.Topfont}>MY PAGE</Text>
      </View>
      <View>
        <View style={styles.Midcontainer}>
          <View style={styles.SauTopcontainer}>
            <Text style={styles.SauText}>SAU</Text>
          </View>

          <View style={styles.SauMidcontainer}>
            <Text style={styles.InfoText}>{me?.name}</Text>
            <Text style={styles.InfoText}>{me?.major}</Text>
            <Text style={styles.InfoText}>{21811027}</Text>
          </View>

          <View style={styles.SauBotcontainer}>
            <Text style={styles.IconText}>SAU </Text>
            <Text style={styles.UniversityText}> 신안산대학교</Text>
          </View>
        </View>
      </View>

      <View>
        <Image
          style={styles.profileIcon}
          source={{
            uri: me?.profileImage,
          }}
        />
      </View>
      <View style={styles.Buttoncontainer}>
        <View style={styles.Logout}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.LogoutButton}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text style={styles.logoutText}> Log Out </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.MyPost}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.MyPostButton}
            onPress={() => {
              navigation.navigate("Myposting");
            }}
          >
            <Text style={styles.logoutText}>내가 쓴 글 보기</Text>
          </TouchableOpacity>
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
    flex: 0.1,
    padding: 7,
    width: 200,
    height: 50,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginLeft: 20,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "red",
  },
  Topfont: {
    fontSize: 30,
    fontWeight: "bold",
  },
  logoutText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  Buttoncontainer: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 20,
  },
  Midcontainer: {
    padding: 20,
    backgroundColor: "#FFF",
  },
  LogoutButton: {
    justifyContent: "center",
    padding: 20,
    backgroundColor: "blue",
    borderRadius: 25,
  },
  MyPostButton: {
    justifyContent: "center",
    padding: 20,
    backgroundColor: "red",
    borderRadius: 25,
  },
  Logout: {
    backgroundColor: "white",
  },
  Mypost: {
    backgroundColor: "white",
  },
  profileIcon: {
    width: 110,
    height: 140,
    borderRadius: 25,
    position: "absolute",
    right: 35,
    bottom: 90,
  },
  InfoText: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 2,
  },
  SauText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "white",
  },
  SauTopcontainer: {
    backgroundColor: "#0080FF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 5,
    paddingTop: 15,
    paddingLeft: 20,
    borderBottomWidth: 5,
    borderColor: "orange",
  },
  SauMidcontainer: {
    backgroundColor: "#E0ECF8",
    padding: 5,
    paddingLeft: 30,
    paddingTop: 10,
  },
  SauBotcontainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#E0ECF8",
    padding: 5,
    paddingTop: 20,
    paddingRight: 40,
    paddingBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  UniversityText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
  IconText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2E64FE",
  },
});
