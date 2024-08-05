import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from "@expo/vector-icons/Fontisto";
import Foundation from "@expo/vector-icons/Foundation";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import Zocial from "@expo/vector-icons/Zocial";

const IconStore = ({ size = 24, icon, family, color }) => {
  if (family === "AntDesign")
    return <AntDesign name={icon} size={size} color={color} />;
  if (family === "Entypo")
    return <Entypo name={icon} size={size} color={color} />;
  if (family === "EvilIcons")
    return <EvilIcons name={icon} size={size} color={color} />;
  if (family === "Feather")
    return <Feather name={icon} size={size} color={color} />;
  if (family === "FontAwesome")
    return <FontAwesome name={icon} size={size} color={color} />;
  if (family === "FontAwesome5")
    return <FontAwesome5 name={icon} size={size} color={color} />;
  if (family === "FontAwesome6")
    return <FontAwesome6 name={icon} size={size} color={color} />;
  if (family === "Fontisto")
    return <Fontisto name={icon} size={size} color={color} />;
  if (family === "Foundation")
    return <Foundation name={icon} size={size} color={color} />;
  if (family === "Ionicons")
    return <Ionicons name={icon} size={size} color={color} />;
  if (family === "MaterialCommunityIcons")
    return <MaterialCommunityIcons name={icon} size={size} color={color} />;
  if (family === "MaterialIcons")
    return <MaterialIcons name={icon} size={size} color={color} />;
  if (family === "Octicons")
    return <Octicons name={icon} size={size} color={color} />;
  if (family === "SimpleLineIcons")
    return <SimpleLineIcons name={icon} size={size} color={color} />;
  if (family === "Zocial")
    return <Zocial name={icon} size={size} color={color} />;
  return <></>;
};

export default IconStore;
