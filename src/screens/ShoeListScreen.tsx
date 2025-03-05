import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput } from "react-native";

const ShoeListScreen = ({ navigation, favorites, setFavorites }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [shoes, setShoes] = useState([]);

  // Fetch shoe data from API
  useEffect(() => {
    fetch("http://localhost:3000/shoes") // Make sure Express server is running
      .then((response) => response.json())
      .then((data) => setShoes(data))
      .catch((error) => console.error("Error fetching shoes:", error));
  }, []);

  // Toggle favorite status
  const toggleFavorite = (shoe) => {
    if (favorites.some((fav) => fav.id === shoe.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== shoe.id)); // Remove from favorites
    } else {
      setFavorites([...favorites, shoe]); // Add to favorites
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="🔍 Search Shoes..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <TouchableOpacity style={styles.favoriteButton} onPress={() => navigation.navigate("Favorites")}>
        <Text style={styles.favoriteButtonText}>View Favorites ({favorites.length})</Text>
      </TouchableOpacity>

      <FlatList
        data={shoes.filter((shoe) => shoe.name.toLowerCase().includes(searchQuery.toLowerCase()))}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => {
          const isFavorite = favorites.some((fav) => fav.id === item.id);

          return (
            <TouchableOpacity
              style={styles.shoeItem}
              onPress={() => navigation.navigate("ShoeDetails", { shoe: item })}
            >
              <Image source={{ uri: item.image }} style={styles.shoeImage} />
              <View style={styles.shoeInfo}>
                <Text style={styles.shoeName}>{item.name}</Text>
                <Text style={styles.shoeBrand}>{item.brand}</Text>
                <Text style={styles.shoePrice}>${item.price}</Text>
              </View>
              <TouchableOpacity onPress={() => toggleFavorite(item)} style={styles.addToFavorites}>
                <Text style={styles.addToFavoritesText}>{isFavorite ? "Added" : "+ Favorite"}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f5f5f5" },
  searchBar: { height: 40, fontSize: 16, backgroundColor: "#fff", borderRadius: 8, paddingHorizontal: 15, marginBottom: 10 },
  favoriteButton: { padding: 10, backgroundColor: "#007AFF", borderRadius: 10, alignItems: "center", marginBottom: 10 },
  favoriteButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  shoeItem: { flexDirection: "row", backgroundColor: "#fff", marginBottom: 10, borderRadius: 10, padding: 10, alignItems: "center" },
  shoeImage: { width: 80, height: 80, borderRadius: 10, marginRight: 15 },
  shoeInfo: { flex: 1 },
  shoeName: { fontSize: 18, fontWeight: "bold" },
  shoeBrand: { fontSize: 14, color: "gray" },
  shoePrice: { fontSize: 16, color: "#007AFF" },
  addToFavorites: { paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10, backgroundColor: "#FFA500" },
  addToFavoritesText: { color: "#fff", fontWeight: "bold" },
});

export default ShoeListScreen;
