import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import nbaShoes from "../data/nbaShoes.json";

// Load Images Properly
const shoeImages = {
  "air-jordan-1.jpg": require("../../assets/air-jordan-1.jpg"),
  "kobe-6-protro.jpg": require("../../assets/kobe-6-protro.jpg"),
  "kyrie-7.jpg": require("../../assets/kyrie-7.jpg"),
  "dame-8.jpg": require("../../assets/dame-8.jpg"),
  "lebron-21.jpg": require("../../assets/lebron-21.jpg"),
  "nike-pg6.jpg": require("../../assets/nike-pg6.jpg"),
  "under-armour-curry-10.jpg": require("../../assets/under-armour-curry-10.jpg"),
  "adidas-trae-young.jpg": require("../../assets/adidas-trae-young.jpg"),
  "nike-kd-16.jpg": require("../../assets/nike-kd-16.jpg"),
  "jordan-why-not-zero.jpg": require("../../assets/jordan-why-not-zero.jpg"),
  "adidas-vol-7.jpg": require("../../assets/adidas-vol-7.jpg"),
};

const ShoeListScreen = ({ navigation, favorites, setFavorites }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredShoes, setFilteredShoes] = useState(nbaShoes);
  //searchQuery tracks user input for searching shoes.
 //filteredShoes contains the currently visible shoes (filtered dynamically).

  useEffect(() => {
    setFilteredShoes(
      searchQuery
        ? nbaShoes.filter((shoe) => shoe.name.toLowerCase().includes(searchQuery.toLowerCase()))
        : nbaShoes
    );
  }, [searchQuery]);
  //Whenever searchQuery changes, the shoe list updates dynamically.
//Uses .toLowerCase() to make the search case-insensitive.
// If searchQuery is empty, it resets to the full list of shoes

  const addToFavorites = (shoe) => {
    if (!favorites.some((fav) => fav.id === shoe.id)) {
      setFavorites([...favorites, shoe]);
    }
  };
  //fav.id === shoe.id checks if the shoe is already in favorites.
  // Checks if the shoe is already in favorites using .some().
//If not in favorites, adds the shoe using setFavorites([...favorites, shoe])
//below
//Displays a TextInput field for searching.
//Uses onChangeText={setSearchQuery} to update searchQuery state.
// Triggers useEffect to filter results

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="🔍 Search Shoes..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>




      <TouchableOpacity style={styles.favoriteButton} onPress={() => navigation.navigate("Favorites")}>
        <Text style={styles.favoriteButtonText}>View Favorites ({favorites.length})</Text>
      </TouchableOpacity>
      {/*Navigates to the FavoritesScreen when clicked */}
      {/*Displays the count of favorited items using {favorites.length} */}

      <FlatList
        data={filteredShoes}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.shoeItem}
            onPress={() => navigation.navigate("ShoeDetails", { shoe: item })}
          >
            <Image source={shoeImages[item.image]} style={styles.shoeImage} />
            <View style={styles.shoeInfo}>
              <Text style={styles.shoeName}>{item.name}</Text>
              <Text style={styles.shoeBrand}>{item.brand}</Text>
              <Text style={styles.shoePrice}>${item.price}</Text>
            </View>
            <TouchableOpacity onPress={() => addToFavorites(item)} style={styles.addToFavorites}>
              <Text style={styles.addToFavoritesText}>+ Favorite</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        //Maps through filteredShoes and displays each shoe.
       //Each shoe is clickable and navigates to ShoeDetailsScreen using navigation.navigate().
       //Renders shoe image, name, brand, price.
       //Includes a "+ Favorite" button that calls addToFavorites(item)
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f5f5f5" },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  searchBar: { flex: 1, height: 40, fontSize: 16 },
  favoriteButton: { padding: 10, backgroundColor: "#007AFF", borderRadius: 10, alignItems: "center", marginBottom: 10 },
  favoriteButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  shoeItem: { flexDirection: "row", backgroundColor: "#fff", marginBottom: 10, borderRadius: 10, padding: 10, alignItems: "center" },
  shoeImage: { width: 80, height: 80, borderRadius: 10, marginRight: 15 },
  shoeInfo: { flex: 1 },
  shoeName: { fontSize: 18, fontWeight: "bold" },
  shoeBrand: { fontSize: 14, color: "gray" },
  shoePrice: { fontSize: 16, color: "#007AFF" },
  addToFavorites: { paddingVertical: 5, paddingHorizontal: 10, backgroundColor: "#FFA500", borderRadius: 10 },
  addToFavoritesText: { color: "#fff", fontWeight: "bold" },
});

export default ShoeListScreen;
