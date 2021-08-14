import React from "react";
import axios from "axios";

import { StyleSheet, View, Text, ScrollView, SafeAreaView } from "react-native";
import { useUserContext } from "../UserContext";

export default function Order({ navigation, route }) {
  let server = "https://api.saubook.store/"; //도메인 주소  바뀔 일 없음 .

  return (
    <View style={styles.ccc}>
      <Text>Myposting</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  ccc: {
    flex: 1,
  },
});
