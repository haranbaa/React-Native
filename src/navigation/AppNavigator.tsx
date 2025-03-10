import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import HomeScreen from "../screens/HomeScreen";
import ShoeListScreen from "../screens/ShoeListScreen";
import ShoeDetailsScreen from "../screens/ShoeDetailsScreen";
import BasketScreen from "../screens/BasketScreen";
import FavoritesScreen from "../screens/FavoritesScreen";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const [favorites, setFavorites] = useState([]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home-outline";
            } else if (route.name === "Shoes") {
              iconName = "basketball-outline";
            } else if (route.name === "Favorites") {
              iconName = "heart-outline";
            } else if (route.name === "Cart") {
              iconName = "cart-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "gray",
          tabBarShowLabel: false,
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Shoes">
          {(props) => <ShoeListScreen {...props} favorites={favorites} setFavorites={setFavorites} />}
        </Tab.Screen>
        <Tab.Screen name="Favorites">
          {(props) => <FavoritesScreen {...props} favorites={favorites} setFavorites={setFavorites} />}
        </Tab.Screen>
        <Tab.Screen name="Cart" component={BasketScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
