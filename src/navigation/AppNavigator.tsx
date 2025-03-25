import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

// Import Screens
import HomeScreen from "../screens/HomeScreen";
import ShoeListScreen from "../screens/ShoeListScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import BasketScreen from "../screens/BasketScreen";
import ShoeDetailsScreen from "../screens/ShoeDetailsScreen";
import WebViewScreen from "../screens/WebViewScreen"; // Import WebViewScreen
import WebViewContentScreen from "../screens/WebViewContentScreen"; // Import WebViewContentScreen

// Create Navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/** 
 * 🔹 Stack Navigator for Shoe List + Shoe Details 
 *    - Keeps ShoeDetails OUT of the bottom navigation.
 */
const ShoeStackNavigator = ({ favorites, setFavorites, basket, setBasket }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ShoeListMain" 
        options={{ headerShown: false }}
      >
        {(props) => <ShoeListScreen {...props} favorites={favorites} setFavorites={setFavorites} />}
      </Stack.Screen>

      <Stack.Screen 
        name="ShoeDetails" 
        options={{ title: "Shoe Details" }}
      >
        {(props) => <ShoeDetailsScreen {...props} basket={basket} setBasket={setBasket} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

/** 
 * 🔹 Stack Navigator for Favorites + Shoe Details
 *    - Allows navigating from Favorites to Shoe Details.
 */
const FavoritesStackNavigator = ({ favorites, setFavorites, basket, setBasket }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="FavoritesMain" 
        options={{ headerShown: false }}
      >
        {(props) => <FavoritesScreen {...props} favorites={favorites} setFavorites={setFavorites} basket={basket} setBasket={setBasket} />}
      </Stack.Screen>

      <Stack.Screen 
        name="ShoeDetails" 
        options={{ title: "Shoe Details" }}
      >
        {(props) => <ShoeDetailsScreen {...props} basket={basket} setBasket={setBasket} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

/** 
 * 🔹 Main App Navigator (Bottom Tab Navigation) 
 */
const AppNavigator = () => {
  const [favorites, setFavorites] = useState([]); // ⭐️ Favorites state
  const [basket, setBasket] = useState([]); // 🛒 Basket state

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: "#fff", height: 60 },
          tabBarLabelStyle: { fontSize: 12 },
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "#888",
        }}
      >
        {/* 🏠 Home */}
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }} 
        />

        {/* 👟 Shoe List (Stack Navigator) */}
        <Tab.Screen 
          name="ShoeList" 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list-outline" size={size} color={color} />
            ),
          }}
        >
          {(props) => <ShoeStackNavigator {...props} favorites={favorites} setFavorites={setFavorites} basket={basket} setBasket={setBasket} />}
        </Tab.Screen>

        {/* ⭐️ Favorites (Updated to use Star Icon) */}
        <Tab.Screen 
          name="Favorites" 
          options={{
            tabBarBadge: favorites.length > 0 ? favorites.length : null, // Show badge for favorite count
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="star" size={size} color={favorites.length > 0 ? "#FFD700" : color} /> // Gold when items exist
            ),
          }}
        >
          {(props) => <FavoritesStackNavigator {...props} favorites={favorites} setFavorites={setFavorites} basket={basket} setBasket={setBasket} />}
        </Tab.Screen>

        {/* 🛒 Basket */}
        <Tab.Screen 
          name="Basket" 
          options={{
            tabBarBadge: basket.length > 0 ? basket.length : null, // Show basket count
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart-outline" size={size} color={color} />
            ),
          }}
        >
          {(props) => <BasketScreen {...props} basket={basket} setBasket={setBasket} />}
        </Tab.Screen>

        {/* 🌐 WebView */}
        <Tab.Screen 
          name="WebView" 
          component={WebViewScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="link-outline" size={size} color={color} />
            ),
          }}
        />

        {/* 📄 WebView Content */}
        <Tab.Screen 
          name="WebViewContent" 
          component={WebViewContentScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="document-outline" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;