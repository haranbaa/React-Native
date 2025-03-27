import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const WebViewContentScreen = ({ route }) => {
  const { url } = route.params;

  // Log on mount/unmount
  useEffect(() => {
    console.log("WebViewContentScreen mounted with URL:", url);
    return () => {
      console.log("WebViewContentScreen unmounted");
    };
  }, [url]);

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: url }}
        style={{ flex: 1 }}
        onLoadStart={() => console.log("WebView started loading:", url)}
        onLoadProgress={({ nativeEvent }) => {
          console.log("WebView loading progress:", nativeEvent.progress);
        }}
        onLoadEnd={() => console.log("WebView finished loading:", url)}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error("WebView error: ", nativeEvent);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
});

export default WebViewContentScreen;
