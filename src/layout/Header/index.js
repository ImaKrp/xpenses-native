import React, { useState, useRef, useCallback } from "react";
import {
  HeaderWrapper,
  Menu,
  TextIconBackground,
  TextIcon,
  ImageIcon,
  HeaderColumn,
  HeaderText,
  HeaderSmallText,
  DrawerWrapper,
  Bold,
  DrawerBlock,
  DrawerBlockText,
} from "./styles";
import IconStore from "../../components/IconStore";
import { useFocusEffect } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import usersDB from "../../database/Users";
import BottomDrawer from "react-native-animated-bottom-drawer";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

const Header = ({ route, navigation }) => {
  const bottomDrawerRef = useRef(null);
  const [user, setUser] = useState();

  const handleOpenForm = useCallback(() => {
    if (bottomDrawerRef?.current) bottomDrawerRef.current.open();
  }, [bottomDrawerRef]);

  const handleCloseForm = useCallback(() => {
    if (bottomDrawerRef?.current) bottomDrawerRef.current.close();
  }, [bottomDrawerRef]);

  useFocusEffect(
    React.useCallback(() => {
      const fetch = async () => {
        const res = await usersDB.find();
        setUser(res);
      };
      fetch();
    }, [])
  );
  return (
    <>
      <HeaderWrapper>
        <Menu onPress={handleOpenForm}>
          <Feather name="menu" size={30} color="#fafafa" />
        </Menu>
        {route?.name !== "Profile" && (
          <>
            {!user?.image_path ? (
              <TextIconBackground>
                <TextIcon>{(user?.name?.[0] ?? "U").toUpperCase()}</TextIcon>
              </TextIconBackground>
            ) : (
              <ImageIcon
                source={{
                  uri: user?.image_path,
                }}
              />
            )}
            <HeaderColumn>
              <HeaderSmallText>Olá</HeaderSmallText>
              <HeaderText>
                {user?.name && user?.name !== "" ? user?.name : "Usuário"}
              </HeaderText>
            </HeaderColumn>
          </>
        )}
      </HeaderWrapper>
      <BottomDrawer
        ref={bottomDrawerRef}
        snapPoints={[186]}
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
        <DrawerWrapper row>
          <DrawerBlock
            w={(windowWidth - 50) / 2}
            onPress={() => {
              handleCloseForm();
              navigation.navigate("Profile");
            }}
          >
            <IconStore icon="user" family="Feather" color="#fafafa" size={32} />
            <DrawerBlockText mt={6}>meu</DrawerBlockText>
            <DrawerBlockText>
              <Bold>perfil</Bold>
            </DrawerBlockText>
          </DrawerBlock>
          <DrawerBlock
            w={(windowWidth - 50) / 2}
            onPress={() => {
              handleCloseForm();
              navigation.navigate("Categories");
            }}
          >
            <IconStore icon="grid" family="Feather" color="#fafafa" size={32} />
            <DrawerBlockText mt={6}>minhas</DrawerBlockText>
            <DrawerBlockText>
              <Bold>categorias</Bold>
            </DrawerBlockText>
          </DrawerBlock>
        </DrawerWrapper>
      </BottomDrawer>
    </>
  );
};

export default Header;
