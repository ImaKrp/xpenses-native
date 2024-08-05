import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
const { Navigator, Screen } = createStackNavigator();
import { View } from "react-native";
import Layout from "../layout";

export function Routes() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          presentation: "transparentModal",
          navigationBarColor: "gold",
        }}
      >
        <Screen name="Profile" component={Layout} />
        <Screen name="Categories" component={Layout} />
        <Screen name="Calculator" component={Layout} />
      </Navigator>
    </NavigationContainer>
  );
}
