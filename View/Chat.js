import axios from "axios";
import React, { useEffect, useState, version } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import { useUserContext } from "../UserContext.js";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Chat({ navigation, route }) {
  let server = "https://api.saubook.store";
  const { user, setUser } = useUserContext();

  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const postComment = () => {
    console.log(route.params.item);
    axios
      .post(
        server +
          "/chat?token=" +
          user +
          "&postToken=" +
          route.params.item.token +
          "&contents=" +
          comment
      )
      .then(() => {
        setComment("");

        reload();
      });
  };

  const reload = () => {
    axios
      .get(server + "/chat?postToken=" + route.params.item.token)
      .then((response) => {
        console.log(response.data.chat);
        setCommentList(response.data.chat);
      });
  };

  useEffect(() => {
    reload();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "white", flexDirection: "row" }}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.goBack}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.GoBack}>🔙</Text>
        </TouchableOpacity>
        <View style={styles.TopLogo}>
          <Text style={styles.LogoFont}>COMMENTS</Text>
        </View>
      </View>
      <View style={styles.ChattingArea}>
        <FlatList
          data={commentList}
          renderItem={({ item }) => {
            return (
              <View>
                <View style={styles.User}>
                  <View>
                    <Text style={styles.UserText}>
                      {item.major + "과 " + item.name}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.Time}>
                      {route.params.item.timestamp}
                    </Text>
                  </View>
                </View>
                <View style={styles.Comments}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => {
                      Alert.alert(
                        "댓글을 삭제하시겠습니까?",
                        "삭제할경우 되돌릴수 없습니다.",
                        [
                          {
                            text: "예",
                            onPress: () => {
                              console.log(
                                server +
                                  "/chat?token=" +
                                  item.token +
                                  "&userToken=" +
                                  user
                              );
                              axios
                                .delete(
                                  server +
                                    "/chat?token=" +
                                    item.token +
                                    "&userToken=" +
                                    user
                                )
                                .then(() => {
                                  reload();
                                });
                            },
                          },
                          { text: "아니요" },
                        ]
                      );
                    }}
                  >
                    <Text style={styles.ExFont}>{item.contents}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
      <View style={styles.ChatText}>
        <TextInput
          placeholder={"댓글 입력"}
          style={{
            backgroundColor: "white",
            flex: 1,
            padding: 20,
            borderTopLeftRadius: 25,
            borderBottomLeftRadius: 25,
          }}
          value={comment}
          onChangeText={setComment}
        />
        <View style={styles.SendButton}>
          <TouchableOpacity
            style={styles.Button}
            activeOpacity={0.8}
            onPress={postComment}
          >
            <Text style={styles.SendFont}>SEND</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFCC99",
  },
  GoBack: {
    paddingLeft: 10,
    fontSize: 30,
    margin: 10,
  },
  ChattingArea: {
    flex: 1,

    padding: 5,
  },
  ExFont: {
    fontSize: 20,
  },
  ChatText: {
    flex: 0.1,
    flexDirection: "row",
    margin: 5,
  },
  SendButton: {
    flex: 0.3,
    justifyContent: "center",
  },
  Button: {
    flex: 1,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: "#CCFF33",
    justifyContent: "center",
  },
  SendFont: {
    alignItems: "center",
    fontSize: 20,
    margin: 5,
    padding: 5,
    fontWeight: "bold",
  },
  Comments: {
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    margin: 10,
    padding: 10,
  },
  UserText: {
    paddingLeft: 15,
    marginTop: 10,
    fontSize: 15,
    fontWeight: "bold",
  },
  TopLogo: {
    marginLeft: 40,
    justifyContent: "center",
  },
  LogoFont: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#CC66FF",
  },
  User: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  Time: {
    paddingRight: 18,
    marginTop: 10,
    fontSize: 10,
  },
});
