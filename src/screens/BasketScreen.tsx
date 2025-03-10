import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";

const BasketScreen = ({ navigation, basket, setBasket }) => {
  const handleRemoveFromBasket = (shoe) => {
    setBasket(basket.filter((item) => item.id !== shoe.id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Shopping Cart</Text>
      {basket.length === 0 ? (
        <Text style={styles.emptyText}>Your basket is empty.</Text>
      ) : (
        <FlatList
          data={basket}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.shoeItem}>
              {/* Shoe Image */}
              <TouchableOpacity onPress={() => navigation.navigate("ShoeDetails", { shoe: item })}>
                <Image source={{ uri: item.image }} style={styles.shoeImage} />
              </TouchableOpacity>

              {/* Shoe Details */}
              <View style={styles.shoeInfo}>
                <Text style={styles.shoeName}>{item.name}</Text>
                <Text style={styles.shoeBrand}>{item.brand}</Text>
                <Text style={styles.shoePrice}>${item.price}</Text>
              </View>

              {/* Remove Button */}
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveFromBasket(item)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      {/* Checkout Button */}
      {basket.length > 0 && (
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() => Alert.alert("Success", "Your order has been placed!", [{ text: "OK" }])}
        >
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f5f5f5" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  emptyText: { fontSize: 16, textAlign: "center", marginTop: 20, color: "gray" },

  shoeItem: { 
    flexDirection: "row", 
    backgroundColor: "#fff", 
    marginBottom: 10, 
    borderRadius: 10, 
    padding: 10, 
    alignItems: "center", 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },

  shoeImage: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
  
  shoeInfo: { flex: 1 },
  shoeName: { fontSize: 18, fontWeight: "bold" },
  shoeBrand: { fontSize: 14, color: "gray" },
  shoePrice: { fontSize: 16, color: "#007AFF" },

  removeButton: { 
    paddingVertical: 6, 
    paddingHorizontal: 14, 
    borderRadius: 8, 
    backgroundColor: "#d9534f",
  },

  removeButtonText: { color: "#fff", fontSize: 14, fontWeight: "bold" },

  checkoutButton: { 
    backgroundColor: "#28a745", 
    padding: 15, 
    borderRadius: 8, 
    alignItems: "center",
    margin: 10,
  },

  checkoutButtonText: { 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "bold",
  },
});

export default BasketScreen;
