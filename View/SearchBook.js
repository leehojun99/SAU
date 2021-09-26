import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { BarCodeScanner } from "expo-barcode-scanner";

import { useUserContext } from "../UserContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faSearch,
  faBarcode,
  faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";
import ThreadItem from "../Components/ThreadItem";
import { Dimensions } from "react-native";

export default function SearchBook({ navigation, route }) {
  const { user, setUser } = useUserContext();
  const [scanned, setScanned] = useState(false);
  let server = "https://api.saubook.store"; //도메인 주소  바뀔 일 없음 .

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    searchinBarcode(data);
  };

  const searching = (bookTitle) => {
    axios
      .get(server + "/book/search?title=" + bookTitle + "&type=title")
      .then((response) => {
        setSearchResult(response.data);
      });
  };

  const searchinBarcode = (barcode) => {
    axios
      .get(server + "/book/search?isbn=" + barcode + "&type=isbn")
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
        </View>
      </View>
      <View style={{ height: 130, overflow: "hidden" }}>
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={{ height: Dimensions.get("window").height - 80 }}
        />
      </View>
      {route.params.isSearchFilter ? (
        <TouchableOpacity
          style={styles.filterOff}
          onPress={() => {
            // 필터 해제
            route.params.setBook("");
            navigation.goBack();
          }}
        >
          <Text style={styles.filterOffText}>검색 필터 해제</Text>
        </TouchableOpacity>
      ) : (
        <View />
      )}

      <ScrollView style={styles.searchResult}>
        {searchResult.map((item, index) => (
          <ThreadItem
            onPress={() => {
              route.params.setBook(item);
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
  filterOff: {
    padding: 10,
  },
  filterOffText: {
    textAlign: "center",
  },
});
