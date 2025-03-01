import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import nbaShoes from "../data/nbaShoes.json";

// Image Mapping for Local Assets (Since assets are OUTSIDE src/)
const shoeImages = {
  "air-jordan-1": require("../../assets/air-jordan-1.jpg"),
  "kobe-6-protro": require("../../assets/kobe-6-protro.jpg"),
  "kyrie-7": require("../../assets/kyrie-7.jpg"),
  "dame-8": require("../../assets/dame-8.jpg"),
};

const ShoeListScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredShoes, setFilteredShoes] = useState(nbaShoes);

  // Search filter function
  useEffect(() => {
    if (searchQuery) {
      const filtered = nbaShoes.filter((shoe) =>
        shoe.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredShoes(filtered);
    } else {
      setFilteredShoes(nbaShoes);
    }
  }, [searchQuery]);

  return (
    <View style={styles.container}>
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
        </TouchableOpacity>
        
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  shoeItem: {
    flexDirection: "row", // Align image & text side by side
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
    alignItems: "center", // Ensure vertical alignment
  },
  shoeImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15, // Add spacing between image and text
  },
  shoeInfo: {
    flex: 1, // Allow text to take remaining space
  },
  shoeName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  shoeBrand: {
    fontSize: 14,
    color: "gray",
  },
  shoePrice: {
    fontSize: 16,
    color: "#007AFF",
  },
});

export default ShoeListScreen;
