import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Wrapper,
  HeaderWrapper,
  Menu,
  TextIconBackground,
  TextIcon,
  ImageIcon,
  HeaderColumn,
  HeaderText,
  HeaderSmallText,
  NavWrapper,
  NewTransactionButton,
  DrawerWrapper,
  Label,
  Bold,
  ModalButtonWrapper,
  ModalButtonText,
  DrawerBlock,
  DrawerBlockText,
} from "./styles";
import { TouchableOpacity } from "react-native";
import IconStore from "../components/IconStore";
import Constants from "expo-constants";
const { statusBarHeight } = Constants;
import Categories from "../pages/Categories";
import Calculator from "../pages/Calculator";
import Profile from "../pages/Profile";
import Feather from "@expo/vector-icons/Feather";
import usersDB from "../database/Users";
import BottomDrawer from "react-native-animated-bottom-drawer";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const screens = {
  Calculator,
  Categories,
  Profile,
};

const Header = ({ route, navigation }) => {
  const bottomDrawerRef = useRef(null);
  const [user, setUser] = useState();

  const handleOpenForm = useCallback(() => {
    if (bottomDrawerRef?.current) bottomDrawerRef.current.open();
  }, [bottomDrawerRef]);

  const handleCloseForm = useCallback(() => {
    if (bottomDrawerRef?.current) bottomDrawerRef.current.close();
  }, [bottomDrawerRef]);

  useEffect(() => {
    const fetch = async () => {
      const res = await usersDB.find();
      setUser(res);
    };
    fetch();
  }, []);
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
              <HeaderText>{user?.name ?? "Usuário"}</HeaderText>
            </HeaderColumn>
          </>
        )}
      </HeaderWrapper>
      <BottomDrawer
        ref={bottomDrawerRef}
        snapPoints={[210]}
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
        snapPoints={[240]}
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
          <ModalButtonWrapper color="#03DAC6">
            <ModalButtonText color="#03DAC6">receita</ModalButtonText>
            <IconStore icon="plus-circle" family="Feather" color="#03DAC6" />
          </ModalButtonWrapper>
          <ModalButtonWrapper color="#E5405E">
            <ModalButtonText color="#E5405E">despesa</ModalButtonText>
            <IconStore icon="minus-circle" family="Feather" color="#E5405E" />
          </ModalButtonWrapper>
        </DrawerWrapper>
      </BottomDrawer>
    </NavWrapper>
  );
};

const Layout = ({ navigation, route, ...props }) => {
  return (
    <>
      <Wrapper pt={statusBarHeight}>
        {route?.name !== "Calculator" && (
          <Header navigation={navigation} route={route} />
        )}
        {screens[route?.name]({ navigation, route, ...props })}
      </Wrapper>
      {route?.name !== "Calculator" && (
        <Nav navigation={navigation} route={route} />
      )}
    </>
  );
};

export default Layout;
