import React, { useEffect, useState } from "react";
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
import { isSessionActive } from "./src/utils/session";
import Fallback from "./src/pages/Fallback";

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [loaded, error] = useFonts({
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
  });
  const [mode, setMode] = useState(null);

  useEffect(() => {
    const asyncRemoveSplase = async () => {
      const active = await isSessionActive();
      if (!active) {
        setMode("notice");
        if (loaded || error) await SplashScreen.hideAsync();
        return;
      }

      const res = await schemaDB.checkNrun();
      if (res === true && (loaded || error)) {
        setMode("app");
        SplashScreen.hideAsync();
      }
    };

    asyncRemoveSplase();
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  if (mode === null) {
    return null;
  }

  if (mode === "notice") {
    return <Fallback />;
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
