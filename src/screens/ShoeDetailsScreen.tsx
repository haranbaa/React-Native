import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";

const ShoeDetailsScreen = ({ route, basket = [], setBasket }) => {
  const shoe = route.params?.shoe || {}; 

  const handleAddToBasket = () => {
    if (!basket) {
      Alert.alert("Error", "Basket is not initialized.", [{ text: "OK" }]);
      return;
    }

    if (!basket.some((item) => item.id === shoe.id)) {
      setBasket([...basket, shoe]);
      Alert.alert("Added To Basket Successful", `You have added ${shoe.name} to your basket!`, [{ text: "OK" }]);
    } else {
      Alert.alert("Already in Basket", `${shoe.name} is already in your basket.`, [{ text: "OK" }]);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: shoe.image }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{shoe.name}</Text>
        <Text style={styles.brand}>{shoe.brand}</Text>
        <Text style={styles.price}>${shoe.price}</Text>
        <Text style={styles.description}>{shoe.description}</Text>
      </View>

      <TouchableOpacity style={styles.payButton} onPress={handleAddToBasket}>
        <Text style={styles.payButtonText}>Add to Basket</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", backgroundColor: "#fff", paddingTop: 20 },
  image: { width: "90%", height: 300, resizeMode: "contain", marginBottom: 20 },
  detailsContainer: { padding: 20, alignItems: "center", width: "100%" },
  name: { fontSize: 24, fontWeight: "bold" },
  brand: { fontSize: 18, color: "gray" },
  price: { fontSize: 22, color: "#007AFF", fontWeight: "bold", marginVertical: 10 },
  description: { fontSize: 16, textAlign: "center", paddingHorizontal: 20, color: "#555" },
  payButton: { marginTop: 20, backgroundColor: "#007AFF", paddingVertical: 15, paddingHorizontal: 40, borderRadius: 8, alignItems: "center", width: "80%" },
  payButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default ShoeDetailsScreen;
