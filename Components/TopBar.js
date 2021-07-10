import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faBell,
  faSearch,
  faQuestion,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function TopBar(props) {
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            props.reload(); /* navigation.navigate('Post') */
          }}
        >
          <Text style={styles.title}>⏳ 실시간</Text>
        </TouchableOpacity>
        <View style={styles.icon}>
          <TouchableOpacity
            style={styles.search}
            onPress={() => {
              props.navigation.navigate("SearchBook", {
                setBook: props.filter,
                isSearchFilter: true,
              });
            }}
          >
            <Text style={styles.searchText}>🔍</Text>
            {/*<FontAwesomeIcon icon={faSearch} size={25} />*/}
          </TouchableOpacity>
          <TouchableOpacity style={styles.bell} onPress={() => {}}>
            <Text style={styles.bellText}>🔔</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Poststyle: {
    padding: 10,
  },

  post: {
    flexDirection: "row",
  },

  container: {
    marginBottom: 15,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  QnA: {
    paddingTop: 15,
    marginRight: 20,
  },
  title: {
    padding: 20,
    paddingBottom: 15,
    fontSize: 30,
    fontWeight: "bold",
  },

  icon: {
    flexDirection: "row",
    alignItems: "center",
  },

  search: {
    paddingRight: 30,
  },
  searchText: {
    fontSize: 30,
  },
  bell: {
    paddingRight: 20,
  },
  bellText: {
    fontSize: 30,
  },
});
