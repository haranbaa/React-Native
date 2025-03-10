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

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ShoeStackNavigator = ({ favorites, setFavorites, basket, setBasket }) => {
  return (
    <Stack.Navigator>
      {/* Shoe List Screen */}
      <Stack.Screen 
        name="ShoeListMain" 
        options={{ headerShown: false }}
      >
        {(props) => <ShoeListScreen {...props} favorites={favorites} setFavorites={setFavorites} />}
      </Stack.Screen>

      {/* Shoe Details Screen (NOT in bottom navigation) */}
      <Stack.Screen 
        name="ShoeDetails" 
        options={{ title: "Shoe Details" }}
      >
        {(props) => <ShoeDetailsScreen {...props} basket={basket} setBasket={setBasket} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const [favorites, setFavorites] = useState([]);
  const [basket, setBasket] = useState([]);

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

        {/* ❤️ Favorites */}
        <Tab.Screen 
          name="Favorites" 
          options={{
            tabBarBadge: favorites.length > 0 ? favorites.length : null, // Show badge for favorite count
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart-outline" size={size} color={color} />
            ),
          }}
        >
          {(props) => <FavoritesScreen {...props} favorites={favorites} setFavorites={setFavorites} />}
        </Tab.Screen>

        {/* 🛒 Basket */}
        <Tab.Screen 
          name="Basket" 
          options={{
            tabBarBadge: basket.length > 0 ? basket.length : null, // Show badge for basket count
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart-outline" size={size} color={color} />
            ),
          }}
        >
          {(props) => <BasketScreen {...props} basket={basket} setBasket={setBasket} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
