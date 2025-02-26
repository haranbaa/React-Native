import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "kyrie irving" }} // Change title to player name
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: "Michael Jordan" }} // Change title to player name
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
