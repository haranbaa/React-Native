import React from "react";
import { 
  View, Text, FlatList, Image, StyleSheet, 
  TouchableOpacity, Alert 
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const FavoritesScreen = ({ navigation, favorites, setFavorites, basket, setBasket }) => {
  // ⭐️ Remove from Favorites
  const removeFavorite = (shoeId) => {
    setFavorites(favorites.filter((fav) => fav.id !== shoeId));
  };

  // 🛒 Add to Basket
  const addToBasket = (shoe) => {
    if (!basket.some((item) => item.id === shoe.id)) {
      setBasket([...basket, shoe]);
      Alert.alert("Added to Basket", `${shoe.name} has been added to your basket!`);
    } else {
      Alert.alert("Already in Basket", "This item is already in your basket.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Favorite Shoes</Text>

      {/* 🖤 No favorites */}
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorites added yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.shoeItem}>
              {/* 🏀 Tap to go to Shoe Details */}
              <TouchableOpacity onPress={() => navigation.navigate("ShoeDetails", { shoe: item })}>
                <Image source={{ uri: item.image }} style={styles.shoeImage} />
              </TouchableOpacity>

              <View style={styles.shoeInfo}>
                <Text style={styles.shoeName}>{item.name}</Text>
                <Text style={styles.shoeBrand}>{item.brand}</Text>
                <Text style={styles.shoePrice}>${item.price}</Text>
              </View>

              {/* 🛒 Add to Basket */}
              <TouchableOpacity style={styles.addToBasketButton} onPress={() => addToBasket(item)}>
                <Ionicons name="cart-outline" size={22} color="#fff" />
              </TouchableOpacity>

              {/* 🗑️ Remove from Favorites (Trash Icon) */}
              <TouchableOpacity style={styles.removeButton} onPress={() => removeFavorite(item.id)}>
                <Ionicons name="trash-outline" size={22} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        />
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
    padding: 10, 
    borderRadius: 20, 
    backgroundColor: "#d9534f",
    marginLeft: 5
  },

  addToBasketButton: { 
    padding: 10, 
    borderRadius: 20, 
    backgroundColor: "#28a745",
    marginLeft: 5
  },
});

export default FavoritesScreen;
