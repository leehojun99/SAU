import React, {
  Component,
  useRef,
  useContext,
  useState,
  createRef,
} from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  CheckBox,
  TextInput,
  TouchableOpacity,
} from "react-native";

import ToggleButton from "../Components/ToggleButton";
import { useUserContext } from "../UserContext";
import axios from "axios";
import SearchBook from "./SearchBook";

export default function Post({ navigation }) {
  const { user, setUser } = useUserContext();
  let server = "https://api.saubook.store"; //도메인 주소  바뀔 일 없음 .

  const posting = () => {
    console.log("userCode : " + user);
    axios
      .post(
        server +
          "/post?token=" +
          user +
          "&bookToken=" +
          bookToken.token +
          "&isSell=" +
          sellValue +
          "&description=" +
          content +
          "&major=11&price=" +
          priceValue +
          "&imageUri=" +
          bookToken.imageUri
      )
      .then(function (response) {
        console.log(response);
        navigation.navigate("Home");
      });
  };

  const [value, onChangeText] = React.useState();
  const [content, onChangeContent] = useState("");
  const [priceValue, onChangePrice] = useState(0);
  const [majorValue, setMajorValue] = useState(0);
  const [sellValue, setSellValue] = useState(false);
  const [bookToken, setBookToken] = useState("");

  return (
    <View>
      <View style={styles.Posttop}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.goBack}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.goBackText}>뒤로가기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.Ok}
          onPress={posting}
        >
          <Text style={styles.Oktext}>작성완료</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.pofileContainer}>
        <View style={styles.profile}>
          <View style={styles.Icon}>
            <View style={styles.profileIcon} />
          </View>
          <View style={styles.Icon}>
            <Text>SalerName :</Text>
            <Text>major:</Text>
          </View>
        </View>
      </View>

      <View style={styles.CheckArea}>
        <Image
          style={styles.bookImage}
          source={{ uri: server + "/" + bookToken.imageUri }}
        ></Image>
        <View style={styles.rightContainer}>
          <View style={styles.Check}>
            <ToggleButton
              styles={{ margin: 5 }}
              item={["판매", "구매"]}
              value={sellValue}
              onChangeValue={setSellValue}
            />
          </View>
          <View style={styles.Bookname}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.inputContainer}
              onPress={() => {
                navigation.navigate("SearchBook", {
                  setBookToken: setBookToken,
                });
              }}
            >
              <Text style={styles.bookSelectText}>도서 선택 하기</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.money}>
            <TextInput
              placeholder={"가격 "}
              style={{ backgroundColor: "white", flex: 1, padding: 5 }}
              onChangeText={(text) => onChangePrice(text)}
              value={priceValue}
            />
          </View>
        </View>
      </View>
      <TextInput
        placeholder={"글 내용"}
        style={styles.bookinfo}
        onChangeText={(text) => onChangeContent(text)}
        value={content}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  Posttop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pofileContainer: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  profile: {
    flexDirection: "row",
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    marginBottom: 3,
    backgroundColor: "#FFF",
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
  rightContainer: {
    flex: 1,
    justifyContent: "space-around",
  },
  bookImage: {
    marginLeft: 4,
    marginTop: 4,
    width: 110,
    height: 146,
    borderRadius: 5,
  },
  Bookname: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  input: {
    flex: 1,
    margin: 10,
    marginLeft: 20,
    height: 40,
  },
  Check: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginLeft: 15,
  },

  CheckArea: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 20,
  },
  goBack: {
    padding: 10,
  },
  goBackText: {
    paddingLeft: 15,
    fontSize: 20,
  },
  Oktext: {
    paddingRight: 10,
    fontSize: 20,
  },
  Ok: {
    padding: 10,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 10,
    padding: 10,
    marginTop: 10,
    marginRight: 30,
    alignItems: "center",
    backgroundColor: "#2299CF",
    borderRadius: 20,
  },
  bookSelectText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    paddingLeft: 5,
  },
  bookinfo: {
    margin: 20,
    paddingBottom: 150,
    backgroundColor: "#FFFFFF",
  },
  money: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 20,
    padding: 0,
    marginRight: 30,
    marginTop: 5,
    alignItems: "center",
  },
});
