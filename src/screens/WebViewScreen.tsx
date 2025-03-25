import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const links = [
  { id: "1", name: "Home", url: "internal://Home", icon: "home-outline" }, 
  { id: "2", name: "Favorites", url: "internal://Favorites", icon: "star-outline" },
  { id: "3", name: "Google", url: "https://google.com", icon: "logo-google" }, 
  { id: "4", name: "Facebook", url: "https://facebook.com", icon: "logo-facebook" },
];

const WebViewScreen = () => {
  const navigation = useNavigation();

  const handleLinkPress = (url: string) => {
    if (url.startsWith("internal://")) {
      const page = url.split("://")[1];
      navigation.navigate(page);
    } else {
      navigation.navigate("WebViewContent", { url });
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
            <Ionicons name={item.icon} size={22} color="#007AFF" style={styles.icon} />
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
    flexDirection: "row",
    alignItems: "center",
  },
  linkText: { fontSize: 18, color: "#007AFF" },
  icon: { marginRight: 10 },
});

export default WebViewScreen;
