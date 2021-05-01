import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

export default function ThreadItem(props) {
  let server = "https://api.saubook.store/"; //도메인 주소  바뀔 일 없음 .

  return (
    <TouchableOpacity
      style={[styles.container, props.style]}
      activeOpacity={0.8}
      onPress={props.onPress}
    >
      {/* 글을 클릭하면  거래 가능한 페이지로 넘어감*/}
      <View style={styles.itemExplains}>
        <View style={styles.bookImageContainer}>
          <Image
            style={styles.bookImage}
            source={{ uri: server + props.imageUri }}
          ></Image>
        </View>

        <View style={styles.bookData}>
          <View style={styles.sellContainer}>
            <Text style={styles.bookName}>{props.title}</Text>
            <View>
              {props.isSearchData ? (
                <View />
              ) : props.isSale ? (
                <View style={styles.iconSale}>
                  <Text style={styles.saleText}>판매</Text>
                </View>
              ) : (
                <View style={styles.iconPurchase}>
                  <Text style={styles.saleText}>구매</Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.secon}>
            {props.isSearchData ? (
              <View />
            ) : (
              <View style={styles.inform}>
                <Text style={styles.userName}>{props.name} </Text>
                <Text>({props.major}과)</Text>
              </View>
            )}
            <View style={styles.thisprice}>
              <Text style={styles.priceClass}>\{props.price}</Text>
            </View>
          </View>
          {props.isSearchData ? (
            <View />
          ) : (
            <View style={styles.descriptionContainer}>
              <Text style={styles.bookExplain}>{props.description}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 2,
    backgroundColor: "#FFF",
    paddingBottom: 30,
  },
  profileBox: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileContainer: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  icon: {
    width: 50,
    height: 66,
    borderRadius: 25,
    backgroundColor: "#2F3E75",
    marginRight: 10,
  },
  iconSale: {
    padding: 2,
    paddingLeft: 7,
    paddingRight: 7,
    height: 30,
    borderRadius: 5,
    backgroundColor: "#FF0000",
    alignItems: "center",
    justifyContent: "center",
  },
  iconPurchase: {
    padding: 2,
    paddingLeft: 7,
    paddingRight: 7,
    height: 30,
    borderRadius: 5,
    backgroundColor: "#1DDB16",
    alignItems: "center",
    justifyContent: "center",
  },
  saleText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  profileData: {
    justifyContent: "center",
    marginRight: 10,
  },

  itemExplains: {
    flexDirection: "row",
  },
  bookImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,

    shadowColor: "#333",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,

    elevation: 10,
  },
  bookImage: {
    marginLeft: 4,
    marginTop: 4,
    width: 72,
    height: 96,
    borderRadius: 5,
  },
  bookName: {
    fontSize: 19,
  },
  bookData: {
    flex: 1,
    marginTop: 10,
  },
  bookExplain: {
    backgroundColor: "#FFEE00",
  },
  profileName: {
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 19,
  },
  profileClass: {
    color: "#333",
    fontSize: 19,
  },
  cutline: {
    width: "100%",
    height: 1,
    backgroundColor: "#333",
  },
  descriptionContainer: {},
  thisprice: {},
  priceClass: {
    fontSize: 17,
  },
  sellContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  inform: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  secon: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
