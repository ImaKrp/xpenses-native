import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  NavWrapper,
  NewTransactionButton,
  DrawerWrapper,
  Label,
  Bold,
  ModalButtonWrapper,
  ModalButtonText,
} from "./styles";
import { TouchableOpacity } from "react-native";
import IconStore from "../../components/IconStore";
import BottomDrawer from "react-native-animated-bottom-drawer";

const Nav = ({ navigation, route }) => {
  const bottomDrawerRef = useRef(null);
  const handleOpenForm = useCallback(() => {
    if (bottomDrawerRef?.current) bottomDrawerRef.current.open();
  }, [bottomDrawerRef]);

  const handleCloseForm = useCallback(() => {
    if (bottomDrawerRef?.current) bottomDrawerRef.current.close();
  }, [bottomDrawerRef]);
  return (
    <NavWrapper>
      <TouchableOpacity>
        <IconStore
          icon="home"
          family="MaterialIcons"
          color={route?.name === "Home" ? "#fafafa" : "#fafafa80"}
          size={32}
        />
      </TouchableOpacity>
      <NewTransactionButton onPress={handleOpenForm}>
        <IconStore icon="plus" family="Entypo" color="#fafafa" size={32} />
      </NewTransactionButton>
      <TouchableOpacity>
        <IconStore
          icon="list"
          family="MaterialIcons"
          color={route?.name === "List" ? "#fafafa" : "#fafafa80"}
          size={32}
        />
      </TouchableOpacity>
      <BottomDrawer
        ref={bottomDrawerRef}
        snapPoints={[220]}
        enableSnapping
        customStyles={{
          container: {
            backgroundColor: "#191919",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 20,
          },
          handle: {
            backgroundColor: "#2E2E2E",
            width: 45,
            height: 5,
            borderRadius: 10,
          },
        }}
      >
        <DrawerWrapper>
          <Label>
            o que você quer <Bold>adicionar</Bold>?
          </Label>
          <ModalButtonWrapper
            color="#03DAC6"
            onPress={() => {
              handleCloseForm();
              navigation.navigate("Form", {
                type: "receita",
              });
            }}
          >
            <ModalButtonText color="#03DAC6">receita</ModalButtonText>
            <IconStore icon="plus-circle" family="Feather" color="#03DAC6" />
          </ModalButtonWrapper>
          <ModalButtonWrapper
            color="#E5405E"
            onPress={() => {
              handleCloseForm();
              navigation.navigate("Form", {
                type: "despesa",
              });
            }}
          >
            <ModalButtonText color="#E5405E">despesa</ModalButtonText>
            <IconStore icon="minus-circle" family="Feather" color="#E5405E" />
          </ModalButtonWrapper>
        </DrawerWrapper>
      </BottomDrawer>
    </NavWrapper>
  );
};

export default Nav;
