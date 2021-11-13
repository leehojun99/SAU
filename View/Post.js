import React, {
  Component,
  useRef,
  useContext,
  useState,
  createRef,
  useEffect,
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
import * as ImagePicker from "expo-image-picker";

export default function Post({ navigation, route }) {
  const { user, setUser } = useUserContext();
  let server = "https://api.saubook.store"; //도메인 주소  바뀔 일 없음 .

  const getMyData = () => {
    axios.post(server + "/getMy?token=" + user).then(function (response) {
      console.log(response.data);
    });
  };

  const editing = () => {
    const imageUri = image != "" ? image : bookData.imageUri;

    axios
      .put(
        server +
          "/post?token=" +
          route.params.token +
          "&userToken=" +
          user +
          "&bookToken=" +
          bookData.token +
          "&isSell=" +
          sellValue +
          "&description=" +
          content +
          "&major=11&price=" +
          priceValue +
          "&imageUri=" +
          imageUri
      )
      .then(function (response) {
        // console.log(response);
        navigation.navigate("Home");
      });
  };

  const posting = () => {
    const imageUri = image != "" ? image : bookData.imageUri;
    console.log(image);
    axios
      .post(
        server +
          "/post?token=" +
          user +
          "&bookToken=" +
          bookData.token +
          "&isSell=" +
          sellValue +
          "&description=" +
          content +
          "&major=11&price=" +
          priceValue +
          "&imageUri=" +
          imageUri
      )
      .then(function (response) {
        // console.log(response);
        navigation.navigate("Home");
      });
  };

  const [value, onChangeText] = React.useState();
  const [content, onChangeContent] = useState("");
  const [priceValue, onChangePrice] = useState(0);
  const [majorValue, setMajorValue] = useState(0);
  const [sellValue, setSellValue] = useState(false);
  const [bookData, setBookData] = useState("");
  const [image, setImage] = useState(null);
  const [me, setMe] = useState();

  useEffect(() => {
    axios
      .get(server + "/post?token=" + route.params.token + "&userToken=" + user)
      .then((response) => {
        const data = response.data[0];
        onChangeContent(data.description);
        setImage(data.imageUri);
        setSellValue(data.isSell);
        onChangePrice(data.price.toString());
      });
  }, []);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (image == null && bookData != "") pickImage();
  }, [bookData]);
  useEffect(() => {
    axios
      .get(server + "/user/me?userToken=" + user) // 서버에서 타임라인 가져오기
      .then(function (response) {
        setMe(response.data[0]); // 내용 뿌려주기
      });
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const formData = new FormData();
      formData.append("attachment", {
        name: "img",
        type: "image/jpeg",
        uri: result.uri,
      });

      axios
        .post(server + "/upload/img", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          setImage(res.data.filename);
        });
    }
  };

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
          <Text style={styles.goBackText}>🔙</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.Ok}
          onPress={route.params["isEdit"] == true ? editing : posting}
        >
          <Text style={styles.Oktext}>📝</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.pofileContainer}>
        <View style={styles.profile}>
          <View style={styles.Icon}>
            <Image
              style={styles.profileIcon}
              source={{
                uri: me?.profileImage,
              }}
            />
          </View>
          <View style={styles.Icon}>
            <Text style={styles.UserText}>{me?.name}</Text>
            <Text style={styles.UserText}>{me?.major}</Text>
          </View>
        </View>
      </View>

      <View style={styles.CheckArea}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            style={styles.bookImage}
            source={{
              uri:
                image == null
                  ? server + "/" + bookData.imageUri
                  : server + "/" + image,
            }}
          ></Image>
        </TouchableOpacity>
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
                  setBook: setBookData,
                  isSearchFilter: false,
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
        multiline={true}
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
    backgroundColor: "blue",
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
    backgroundColor: "#FFF",
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
    fontSize: 30,
  },
  Oktext: {
    paddingRight: 10,
    fontSize: 30,
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

  UserText: {
    fontSize: 15,
    padding: 2,
  },
});
