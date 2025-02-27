import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";

const ShoeDetailsScreen = ({ navigation }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.goBack()}>
      <Image source={require("../../assets/lam-dunk.jpg")} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default ShoeDetailsScreen;
