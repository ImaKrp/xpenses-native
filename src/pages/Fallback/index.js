import React from "react";
import { StatusBar } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getSessionNotice } from "../../utils/session";
import { Wrapper, IconWrapper, Title, Message } from "./styles";

export default function Fallback() {
  const { title, message } = getSessionNotice();

  return (
    <Wrapper>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <IconWrapper>
        <MaterialCommunityIcons name="cloud-off-outline" size={44} color="#fafafa" />
      </IconWrapper>
      <Title>{title}</Title>
      <Message>{message}</Message>
    </Wrapper>
  );
}
