import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import ShoeListScreen from "../screens/ShoeListScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import BasketScreen from "../screens/BasketScreen";
import ShoeDetailsScreen from "../screens/ShoeDetailsScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const [favorites, setFavorites] = useState([]);

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
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }} 
        />

        <Tab.Screen 
          name="ShoeList" 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list-outline" size={size} color={color} />
            ),
          }}
        >
          {(props) => <ShoeListScreen {...props} favorites={favorites} setFavorites={setFavorites} />}
        </Tab.Screen>

        <Tab.Screen 
          name="Favorites" 
          options={{
            tabBarBadge: favorites.length > 0 ? favorites.length : null, // Show favorite count
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart-outline" size={size} color={color} />
            ),
          }}
        >
          {(props) => <FavoritesScreen {...props} favorites={favorites} setFavorites={setFavorites} />}
        </Tab.Screen>

        <Tab.Screen 
          name="Basket" 
          component={BasketScreen} 
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart-outline" size={size} color={color} />
            ),
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
