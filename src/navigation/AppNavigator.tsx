import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import ShoeListScreen from "../screens/ShoeListScreen";
import ShoeDetailsScreen from "../screens/ShoeDetailsScreen";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Kyrie Irving" }} />
        <Stack.Screen name="ShoeList" component={ShoeListScreen} options={{ title: "NBA Shoes" }} />
        <Stack.Screen name="ShoeDetails" component={ShoeDetailsScreen} options={{ title: "Shoe Details" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
