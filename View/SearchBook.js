import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { useUserContext } from "../UserContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faSearch,
  faBarcode,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import ThreadItem from "../Components/ThreadItem";

export default function SearchBook({ navigation, route }) {
  const { user, setUser } = useUserContext();
  let server = "https://api.saubook.store"; //도메인 주소  바뀔 일 없음 .

  const searching = (bookTitle) => {
    axios
      .get(server + "/book/search?title=" + bookTitle + "&type=title")
      .then((response) => {
        setSearchResult(response.data);
      });
  };
  const [searchResult, setSearchResult] = useState([]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchInputContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <FontAwesomeIcon icon={faAngleLeft} size={40} />
        </TouchableOpacity>
        <View style={styles.searchBoxContainer}>
          <FontAwesomeIcon icon={faSearch} size={30} />
          <TextInput
            style={styles.searchbox}
            onChangeText={(text) => {
              // 검색을 서버로 전송
              searching(text);
            }}
          ></TextInput>
          <TouchableOpacity>
            <FontAwesomeIcon icon={faBarcode} size={30} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.searchResult}>
        {searchResult.map((item, index) => (
          <ThreadItem
            onPress={() => {
              route.params.setBookToken(item);
              navigation.goBack();
            }}
            isSearchData={true}
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
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
  },
  searchBoxContainer: {
    flex: 1,
    marginTop: 10,
    margin: 15,
    marginRight: 20,
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 30,
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,

    borderColor: "#2299CF",
    borderWidth: 2.5,
  },
  searchbox: {
    flex: 1,
    padding: 10,
  },
  searchResult: {
    marginBottom: 80,
  },
});
