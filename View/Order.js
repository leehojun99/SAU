import axios from "axios";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Button,
  Alert,
} from "react-native";

import ChatBox from "../Components/ChatBox";

import { useUserContext } from "../UserContext.js";
import moment from "moment";

export default function Order({ navigation, route }) {
  const { user, setUser } = useUserContext();
  let server = "https://api.saubook.store/"; //도메인 주소  바뀔 일 없음 .

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.pofileContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.goBack}
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={styles.goBackText}>🔙</Text>
            </TouchableOpacity>
            <View style={styles.profile}>
              <View style={styles.profileSecond}>
                <View style={styles.Icon}>
                  <View style={styles.profileIcon} />
                </View>
                <View style={styles.Icon}>
                  <Text>{route.params.item.name}</Text>
                  <Text>{route.params.item.major}과</Text>
                </View>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.remove}
                onPress={() => {
                  Alert.alert(
                    "삭제하시겠습니까?",
                    "글을 삭제하게 되면 되돌릴수 없습니다.",
                    [
                      {
                        text: "예",
                        onPress: () => {
                          console.log(
                            server +
                              "post?userToken=" +
                              user +
                              "&token=" +
                              route.params.item.token
                          );
                          axios.delete(
                            server +
                              "post?userToken=" +
                              user +
                              "&token=" +
                              route.params.item.token
                          );
                          navigation.goBack();
                        },
                      },
                      { text: "아니오" },
                    ]
                  );
                }}
              >
                <Text style={styles.RemoveText}> 글 삭제 </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView>
          <View>
            <View style={styles.saleArea}>
              <View style={styles.sellContainer}>
                {!route.params.item.isSell ? (
                  <View style={styles.iconSale}>
                    <Text style={styles.saleText}>판매</Text>
                  </View>
                ) : (
                  <View style={styles.iconPurchase}>
                    <Text style={styles.saleText}>구매</Text>
                  </View>
                )}
              </View>
              <Image
                style={styles.bookImage}
                source={{ uri: server + route.params.item.imageUri }}
              ></Image>
            </View>
          </View>
          <View style={styles.book}>
            <Text style={styles.bookName}>{route.params.item.title}</Text>
          </View>
          <View>
            <Text style={styles.description}>
              {route.params.item.description}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
      <View style={styles.bottomTab}>
        <View style={styles.bottomTabLeft}>
          <Text style={styles.priceText}>{route.params.item.price}원</Text>
          <Text style={styles.timeText}>
            {moment(route.params.item.timestamp).format("YY-MM-DD hh:mm")}
          </Text>
        </View>
        <View style={styles.bottomTabRight}>
          <TouchableOpacity
            style={styles.chatButton}
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate("Chat", { item: route.params.item });
            }}
          >
            <Text style={styles.chatButtonText}>댓글 남기기 </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  remove: {
    backgroundColor: "black",
    borderRadius: 15,
    justifyContent: "center",
    padding: 5,
  },
  RemoveText: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
  goBack: {
    justifyContent: "center",
    padding: 10,
    paddingLeft: 15,
    paddingRight: 5,
  },
  goBackText: {
    fontSize: 55,
  },
  chatInputContainer: {
    flexDirection: "row",
  },
  chatBox: {
    flex: 1,
    margin: 0,
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 0,
    paddingBottom: 20,
    marginBottom: 3,
    backgroundColor: "#B7F0B1",
  },
  chatScroll: {
    marginBottom: 10,
  },
  sendButton: {
    marginRight: 20,
    backgroundColor: "#FFF",
    justifyContent: "center",
    padding: 5,
    borderRadius: 10,
  },
  chatInput: {
    flex: 1,
    borderRadius: 20,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 0,
    marginRight: 10,
    backgroundColor: "#FFF",
  },
  pofileContainer: {
    flexDirection: "row",
    paddingBottom: 10,
    backgroundColor: "#FFF",
  },
  profile: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    marginBottom: 3,
  },
  profileSecond: {
    flexDirection: "row",
  },
  Icon: {
    justifyContent: "center",
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#2F3E75",
    marginRight: 10,
  },
  saleArea: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,

    shadowColor: "#333",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,

    elevation: 10,
  },
  bookImage: {
    marginBottom: 10,
    marginTop: 10,
    width: 72 * 4,
    height: 96 * 4,
    borderRadius: 5,
  },
  iconPurchase: {
    marginTop: 5,
    padding: 2.5,
    paddingLeft: 5,
    paddingRight: 5,
    width: 80,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#1DDB16",
    alignItems: "center",
    justifyContent: "center",
  },
  iconSale: {
    marginTop: 5,
    padding: 2.5,
    paddingLeft: 5,
    paddingRight: 5,
    width: 80,
    height: 40,
    borderRadius: 5,
    backgroundColor: "#FF0000",
    alignItems: "center",
    justifyContent: "center",
  },
  saleText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 20,
  },

  font: {
    fontWeight: "bold",
    fontSize: 30,
  },
  bookName: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
  },
  isSell: {
    fontWeight: "bold",
    fontSize: 30,
  },
  book: {},
  sell: {
    flexDirection: "row",
  },
  sellContainer: {
    zIndex: 99,
    right: 0,
    position: "absolute",
    justifyContent: "center",
    marginRight: 20,
  },
  bottomTab: {
    height: 100,
    margin: 0,
    marginBottom: 0,
    backgroundColor: "#FFF",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  description: {
    fontSize: 20,
    margin: 10,
  },
  bottomTabLeft: {
    justifyContent: "center",
    paddingLeft: 15,
  },
  bottomTabRight: {
    justifyContent: "center",
    paddingRight: 15,
  },
  chatButtonText: {
    textAlign: "center",
    fontSize: 20,
    color: "#FFF",
  },
  priceText: {
    fontSize: 20,
    margin: 10,
  },
  timeText: {
    fontSize: 14,
    margin: 10,
  },
  chatButton: {
    backgroundColor: "#79a1cd",
    padding: 10,
    borderRadius: 7,
  },
});
