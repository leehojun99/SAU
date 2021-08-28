import React from "react";
import axios from "axios";

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useUserContext } from "../UserContext";

export default function Order({ navigation, route }) {
  let server = "https://api.saubook.store/"; //도메인 주소  바뀔 일 없음 .

  return (
    <View style={styles.ccc}>
      <Text>Myposting</Text>
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
    </View>
  );
}
const styles = StyleSheet.create({
  ccc: {
    flex: 1,
  },
});
