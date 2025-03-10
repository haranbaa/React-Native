import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

const ShoeDetailsScreen = ({ route, basket, setBasket }) => {
  const shoe = route.params?.shoe || {};

  const handlePayNow = () => {
    setBasket([...basket, shoe]); // Add item to basket
    Alert.alert("Added to Basket", `${shoe.name} has been added to your cart!`, [{ text: "OK" }]);
  };

  return (
    <View style={styles.container}>
      {/* Shoe Image */}
      <Image source={{ uri: shoe.image }} style={styles.image} />

      {/* Shoe Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{shoe.name}</Text>
        <Text style={styles.brand}>{shoe.brand}</Text>
        <Text style={styles.price}>${shoe.price}</Text>
        <Text style={styles.description}>{shoe.description}</Text>
      </View>

      {/* Pay Button */}
      <TouchableOpacity style={styles.payButton} onPress={handlePayNow}>
        <Text style={styles.payButtonText}>Order Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", backgroundColor: "#fff", paddingVertical: 20 },
  image: { width: "90%", height: 300, resizeMode: "contain", marginBottom: 20, borderRadius: 10 },
  detailsContainer: { padding: 20, alignItems: "center", width: "100%", backgroundColor: "#f9f9f9", borderRadius: 10 },
  name: { fontSize: 24, fontWeight: "bold", color: "#333" },
  brand: { fontSize: 18, color: "gray", marginVertical: 5 },
  price: { fontSize: 22, color: "#007AFF", fontWeight: "bold", marginVertical: 10 },
  description: { fontSize: 16, textAlign: "center", paddingHorizontal: 20, color: "#555" },
  payButton: { marginTop: 20, backgroundColor: "#007AFF", paddingVertical: 15, paddingHorizontal: 40, borderRadius: 8, alignItems: "center", width: "80%", elevation: 3 },
  payButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default ShoeDetailsScreen;
