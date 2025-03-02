import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

const shoeImages = {
  "air-jordan-1": require("../../assets/air-jordan-1.jpg"),
  "kobe-6-protro": require("../../assets/kobe-6-protro.jpg"),
  "kyrie-7": require("../../assets/kyrie-7.jpg"),
  "dame-8": require("../../assets/dame-8.jpg"),
};

const ShoeDetailsScreen = ({ route }) => {
  const { shoe } = route.params || {};

  const handlePayNow = () => {
    Alert.alert("Payment Successful", `You have purchased ${shoe.name}!`, [{ text: "OK" }]);
  };

  return (
    <View style={styles.container}>
      <Image source={shoeImages[shoe.image]} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{shoe.name}</Text>
        <Text style={styles.brand}>{shoe.brand}</Text>
        <Text style={styles.price}>${shoe.price}</Text>
        <Text style={styles.description}>{shoe.description}</Text>
      </View>

      {/* CTA Pay Button */}
      <TouchableOpacity style={styles.payButton} onPress={handlePayNow}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  image: {
    width: "90%",
    height: 300,
    resizeMode: "contain",
    marginBottom: 20,
  },
  detailsContainer: {
    padding: 20,
    alignItems: "center",
    width: "100%",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  brand: {
    fontSize: 18,
    color: "gray",
  },
  price: {
    fontSize: 22,
    color: "#007AFF",
    fontWeight: "bold",
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
    color: "#555",
  },
  payButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
  },
  payButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ShoeDetailsScreen;
