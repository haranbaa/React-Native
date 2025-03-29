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
import WebViewScreen from "../screens/WebViewScreen";
import WebViewContentScreen from "../screens/WebViewContentScreen";

// Create Navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Linking configuration for deep linking
const linking = {
  prefixes: ["myfirstapp://"],
  config: {
    screens: {
      ShoeList: {
        screens: {
          ShoeDetails: "shoe/:id",
        },
      },
      Favorites: {
        screens: {
          ShoeDetails: "shoe/:id",
        },
      },
    },
  },
};

const ShoeStackNavigator = ({ favorites, setFavorites, basket, setBasket }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ShoeListMain" options={{ headerShown: false }}>
        {(props) => (
          <ShoeListScreen
            {...props}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="ShoeDetails" options={{ title: "Shoe Details" }}>
        {(props) => (
          <ShoeDetailsScreen
            {...props}
            basket={basket}
            setBasket={setBasket}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const FavoritesStackNavigator = ({ favorites, setFavorites, basket, setBasket }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FavoritesMain" options={{ headerShown: false }}>
        {(props) => (
          <FavoritesScreen
            {...props}
            favorites={favorites}
            setFavorites={setFavorites}
            basket={basket}
            setBasket={setBasket}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="ShoeDetails" options={{ title: "Shoe Details" }}>
        {(props) => (
          <ShoeDetailsScreen
            {...props}
            basket={basket}
            setBasket={setBasket}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

const WebViewStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="WebViewMain" options={{ headerShown: false }}>
        {(props) => <WebViewScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen
        name="WebViewContent"
        component={WebViewContentScreen}
        options={{ title: "Web Content" }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const [favorites, setFavorites] = useState([]);
  const [basket, setBasket] = useState([]);

  return (
    <NavigationContainer linking={linking}>
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
          {(props) => (
            <ShoeStackNavigator
              {...props}
              favorites={favorites}
              setFavorites={setFavorites}
              basket={basket}
              setBasket={setBasket}
            />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="Favorites"
          options={{
            tabBarBadge: favorites.length > 0 ? favorites.length : null,
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="star"
                size={size}
                color={favorites.length > 0 ? "#FFD700" : color}
              />
            ),
          }}
        >
          {(props) => (
            <FavoritesStackNavigator
              {...props}
              favorites={favorites}
              setFavorites={setFavorites}
              basket={basket}
              setBasket={setBasket}
            />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="Basket"
          options={{
            tabBarBadge: basket.length > 0 ? basket.length : null,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cart-outline" size={size} color={color} />
            ),
          }}
        >
          {(props) => (
            <BasketScreen {...props} basket={basket} setBasket={setBasket} />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="WebView"
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="link-outline" size={size} color={color} />
            ),
          }}
        >
          {(props) => <WebViewStackNavigator {...props} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
