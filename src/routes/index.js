import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
const { Navigator, Screen } = createStackNavigator();
import Categories from "../pages/Categories";
import Calculator from "../pages/Calculator";
import Profile from "../pages/Profile";
import Form from "../pages/Form";
import List from "../pages/List";
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
        <Screen name="List">
          {(props) => (
            <Layout {...props}>
              <List {...props} />
            </Layout>
          )}
        </Screen>
        <Screen name="Profile">
          {(props) => (
            <Layout {...props}>
              <Profile {...props} />
            </Layout>
          )}
        </Screen>
        <Screen name="Categories">
          {(props) => (
            <Layout {...props}>
              <Categories {...props} />
            </Layout>
          )}
        </Screen>
        <Screen name="Form">
          {(props) => (
            <Layout {...props}>
              <Form {...props} />
            </Layout>
          )}
        </Screen>
        <Screen name="Calculator">
          {(props) => (
            <Layout {...props}>
              <Calculator {...props} />
            </Layout>
          )}
        </Screen>
      </Navigator>
    </NavigationContainer>
  );
}
