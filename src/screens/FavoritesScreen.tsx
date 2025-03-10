import React from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const FavoritesScreen = ({ navigation, favorites, setFavorites }) => {
  const removeFavorite = (shoeId) => {
    setFavorites(favorites.filter((fav) => fav.id !== shoeId));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Favorite Shoes</Text>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorites added yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.shoeItem}>
              <TouchableOpacity onPress={() => navigation.navigate("ShoeDetails", { shoe: item })}>
                <Image source={{ uri: item.image }} style={styles.shoeImage} />
              </TouchableOpacity>
              <View style={styles.shoeInfo}>
                <Text style={styles.shoeName}>{item.name}</Text>
                <Text style={styles.shoeBrand}>{item.brand}</Text>
                <Text style={styles.shoePrice}>${item.price}</Text>
              </View>

              {/* Remove from Favorites Button */}
              <TouchableOpacity style={styles.removeButton} onPress={() => removeFavorite(item.id)}>
                <Ionicons name="trash-outline" size={20} color="#fff" />
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
  shoeItem: { flexDirection: "row", backgroundColor: "#fff", marginBottom: 10, borderRadius: 10, padding: 10, alignItems: "center", elevation: 2 },
  shoeImage: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
  shoeInfo: { flex: 1 },
  shoeName: { fontSize: 18, fontWeight: "bold" },
  shoeBrand: { fontSize: 14, color: "gray" },
  shoePrice: { fontSize: 16, color: "#007AFF" },
  removeButton: { padding: 10, borderRadius: 20, backgroundColor: "#d9534f" },
});

export default FavoritesScreen;
