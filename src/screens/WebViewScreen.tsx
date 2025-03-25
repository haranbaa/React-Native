import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

// List of links (internal and external)
const links = [
  { id: "1", name: "Internal Link 1", url: "internal://Home" }, 
  { id: "2", name: "Internal Link 2", url: "internal://Favorites" }, 
  { id: "3", name: "External Link 1", url: "https://google.com" }, 
  { id: "4", name: "External Link 2", url: "https://facebook.com" },
];

const WebViewScreen = () => {
  const navigation = useNavigation();

  // Handle link press
  const handleLinkPress = (url: string) => {
    if (url.startsWith("internal://")) {
      const page = url.split("://")[1];
      navigation.navigate(page); // Correct screen navigation
    } else {
      navigation.navigate("WebViewContent", { url });  // Ensure URL is passed
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Web Links</Text>
      <FlatList
        data={links}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.linkItem}
            onPress={() => handleLinkPress(item.url)}
          >
            <Text style={styles.linkText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f5f5f5" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  linkItem: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 3,
  },
  linkText: { fontSize: 18, color: "#007AFF" },
});

export default WebViewScreen;
