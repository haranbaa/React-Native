import React from "react";
import { View, Image, StyleSheet } from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image source={require("../../assets/KyrieIrving.webp")} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

export default HomeScreen;
