import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import nbaShoes from "../data/nbaShoes.json";

// Image Mapping for Local Assets
const shoeImages = {
  "air-jordan-1": require("../../assets/air-jordan-1.jpg"),
  "kobe-6-protro": require("../../assets/kobe-6-protro.jpg"),
  "kyrie-7": require("../../assets/kyrie-7.jpg"),
  "dame-8": require("../../assets/dame-8.jpg"),
};

const ShoeListScreen = ({ navigation, favorites, setFavorites }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredShoes, setFilteredShoes] = useState(nbaShoes);

  useEffect(() => {
    if (searchQuery) {
      setFilteredShoes(nbaShoes.filter((shoe) =>
        shoe.name.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    } else {
      setFilteredShoes(nbaShoes);
    }
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      {/* Favorites Button */}
      <TouchableOpacity style={styles.favoritesButton} onPress={() => navigation.navigate("Favorites")}>
        <Text style={styles.favoritesText}>View Favorites ({favorites.length})</Text>
      </TouchableOpacity>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search Shoes..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Shoe List */}
      <FlatList
        data={filteredShoes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isFavorite = favorites.some((fav) => fav.id === item.id);

          return (
            <View style={styles.shoeItem}>
              <TouchableOpacity onPress={() => navigation.navigate("ShoeDetails", { shoe: item })}>
                <Image source={shoeImages[item.image]} style={styles.shoeImage} />
              </TouchableOpacity>
              <View style={styles.shoeInfo}>
                <Text style={styles.shoeName}>{item.name}</Text>
                <Text style={styles.shoeBrand}>{item.brand}</Text>
                <Text style={styles.shoePrice}>${item.price}</Text>
              </View>

              {/* Add to Favorites Button (No Remove Here) */}
              <TouchableOpacity
                style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
                onPress={() => {
                  if (!isFavorite) {
                    setFavorites([...favorites, item]);
                  }
                }}
              >
                <Text style={styles.favoriteButtonText}>{isFavorite ? "✓ Added" : "Add"}</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f5f5f5" },
  favoritesButton: { backgroundColor: "#222", padding: 12, borderRadius: 8, alignItems: "center", marginBottom: 15 },
  favoritesText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  searchBar: { height: 40, borderWidth: 1, borderColor: "#ddd", borderRadius: 8, paddingHorizontal: 10, marginBottom: 10, backgroundColor: "#fff" },
  shoeItem: { flexDirection: "row", backgroundColor: "#fff", marginBottom: 10, borderRadius: 10, padding: 10, alignItems: "center", elevation: 2 },
  shoeImage: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
  shoeInfo: { flex: 1 },
  shoeName: { fontSize: 18, fontWeight: "bold" },
  shoeBrand: { fontSize: 14, color: "gray" },
  shoePrice: { fontSize: 16, color: "#007AFF" },
  favoriteButton: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 8, backgroundColor: "#333" },
  favoriteButtonActive: { backgroundColor: "#007AFF" },
  favoriteButtonText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
});

export default ShoeListScreen;
