import React from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const WebViewContentScreen = ({ route }) => {
  const { url } = route.params;

  return (
    <View style={styles.container}>
      <WebView source={{ uri: url }} style={{ flex: 1 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});

export default WebViewContentScreen;