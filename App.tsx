import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const App: React.FC = () => {
  const [message, setMessage] = useState("first react native!");
  const [image, setImage] = useState(require("./images/image.webp"));

  const changeText = () => {
    setMessage("You clicked the button!");
    setImage(require("./images/another-image.webp"));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{message}</Text>
      <TouchableOpacity onPress={changeText}>
        <Image source={image} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
});

export default App;
