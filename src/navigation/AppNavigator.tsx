import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import ShoeListScreen from "../screens/ShoeListScreen";
import ShoeDetailsScreen from "../screens/ShoeDetailsScreen";
import BasketScreen from "../screens/BasketScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [basket, setBasket] = useState([]); // ✅ Centralized basket state

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{ title: "Kyrie Irving" }}
        >
          {(props) => <HomeScreen {...props} basket={basket} setBasket={setBasket} />}
        </Stack.Screen>

        <Stack.Screen
          name="ShoeList"
          options={{ title: "NBA Shoes" }}
        >
          {(props) => <ShoeListScreen {...props} basket={basket} setBasket={setBasket} />}
        </Stack.Screen>

        <Stack.Screen
          name="ShoeDetails"
          options={{ title: "Shoe Details" }}
        >
          {(props) => <ShoeDetailsScreen {...props} basket={basket} setBasket={setBasket} />}
        </Stack.Screen>

        <Stack.Screen
          name="Basket"
          options={{ title: "Your Basket" }}
        >
          {(props) => <BasketScreen {...props} basket={basket} setBasket={setBasket} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
