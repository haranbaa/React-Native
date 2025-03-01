import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";

const shoeImages = {
  "air-jordan-1": require("../../assets/air-jordan-1.jpg"),
  "kobe-6-protro": require("../../assets/kobe-6-protro.jpg"),
  "kyrie-7": require("../../assets/kyrie-7.jpg"),
  "dame-8": require("../../assets/dame-8.jpg"),
};

const BasketScreen = ({ route, navigation }) => {
  const { basket, setBasket } = route.params;

  // Function to handle checkout
  const handleCheckout = () => {
    Alert.alert("Checkout Successful", "Thank you for your purchase!", [
      { text: "OK", onPress: () => setBasket([]) } // ✅ Clear basket after checkout
    ]);
  };

  // Function to clear basket
  const handleClearBasket = () => {
    Alert.alert("Basket Cleared", "All items have been removed.", [
      { text: "OK", onPress: () => setBasket([]) }
    ]);
  };

  return (
    <View style={styles.container}>
      {basket.length === 0 ? (
        <Text style={styles.emptyText}>Your basket is empty.</Text>
      ) : (
        <>
          <FlatList
            data={basket}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.shoeItem}>
                <Image source={shoeImages[item.image]} style={styles.shoeImage} />
                <View style={styles.shoeInfo}>
                  <Text style={styles.shoeName}>{item.name}</Text>
                  <Text style={styles.shoePrice}>${item.price}</Text>
                </View>
              </View>
            )}
          />
          {/* Checkout & Clear Basket Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.buttonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clearButton} onPress={handleClearBasket}>
              <Text style={styles.buttonText}>Clear Basket</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  emptyText: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
    marginTop: 50,
  },
  shoeItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  shoeImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  shoeInfo: {
    flex: 1,
  },
  shoeName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  shoePrice: {
    fontSize: 16,
    color: "#007AFF",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  checkoutButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 5,
  },
  clearButton: {
    flex: 1,
    backgroundColor: "#FF3B30",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginLeft: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BasketScreen;
