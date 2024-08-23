import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { useFonts } from "expo-font";
import {
  Montserrat_300Light,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
} from "@expo-google-fonts/montserrat";

import * as SplashScreen from "expo-splash-screen";
import { Routes } from "./src/routes";
import schemaDB from "./src/database/Schema";

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [loaded, error] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
  });

  useEffect(() => {
    const asyncRemoveSplase = async () => {
      const res = await schemaDB.checkNrun();
      console.log(res);
      if (res === true && (loaded || error)) {
        SplashScreen.hideAsync();
      }
    };

    asyncRemoveSplase();
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <Routes />
    </>
  );
}
