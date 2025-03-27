import React, { useEffect } from "react";
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

  // Optional: Example useEffect to log component mount/unmount
  useEffect(() => {
    console.log("WebViewScreen mounted");
    return () => {
      console.log("WebViewScreen unmounted");
    };
  }, []);

  const handleLinkPress = (url: string) => {
    console.log("Link pressed:", url);

    // Check if it's an internal link
    if (url.startsWith("internal://")) {
      const page = url.split("://")[1];
      console.log("Navigating internally to:", page);
      navigation.navigate(page);
    } else {
      // Otherwise, open external URL in the WebViewContentScreen
      console.log("Opening external link in WebView:", url);
      navigation.navigate("WebViewContent", { url });
    }
  };

  const renderLinkItem = ({ item }) => {
    console.log("Rendering link item:", item.name);

    return (
      <TouchableOpacity
        style={styles.linkItem}
        onPress={() => {
          console.log(`Item pressed: ${item.name}`);
          handleLinkPress(item.url);
        }}
      >
        <Ionicons name={item.icon} size={22} color="#007AFF" style={styles.icon} />
        <Text style={styles.linkText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Web Links</Text>
      <FlatList
        data={links}
        keyExtractor={(item) => item.id}
        renderItem={renderLinkItem}
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
