import React, { useState, useEffect, useCallback } from "react";
import usersDB from "../../database/Users";
import Input from "../../components/Input";
import { View } from "react-native";
import * as FileSystem from "expo-file-system";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import {
  Wrapper,
  SubmitButton,
  SubmitText,
  Text,
  Bold,
  ImageIcon,
  TextIcon,
  TextIconBackground,
  RelativeView,
  SelectImage,
} from "./styles";
import IconStore from "../../components/IconStore";

const Profile = () => {
  const [user, setUser] = useState();
  const [name, setName] = useState();
  const [image, setImage] = useState("");

  const [buttonText, setButtonText] = useState("salvar");

  useEffect(() => {
    setButtonText("salvar");
  }, [name, image]);

  useFocusEffect(
    React.useCallback(() => {
      const fetch = async () => {
        const res = await usersDB.find();

        if (res) setName(res?.name);
        if (res) setImage(res?.image_path);
        setUser(res);
      };
      fetch();
    }, [])
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const { mimeType, uri } = result.assets[0];
      let options = { encoding: FileSystem.EncodingType.Base64 };
      FileSystem.readAsStringAsync(uri, options).then((data) => {
        const base64 = "data:" + mimeType + ";base64," + data;
        setImage(base64);
      });
    }
  };

  const getUserName = () => {
    if (name) return name;
    return "Usuário";
  };

  const handleSubmit = async () => {
    if (user === null) {
      await usersDB.create({ name, image_path: image });
      const res = await usersDB.find();
      if (res) setName(res?.name);
      setUser(res);
      setButtonText("salvo");
      return;
    }

    await usersDB.update({ name, image_path: image, id: user?.id });
    const res = await usersDB.find();
    if (res) setName(res?.name);
    setButtonText("salvo");
    setUser(res);
  };

  return (
    <Wrapper>
      <RelativeView onPress={pickImage}>
        {!user?.image_path && !image ? (
          <TextIconBackground>
            <TextIcon>{getUserName()?.[0]?.toUpperCase()}</TextIcon>
          </TextIconBackground>
        ) : (
          <ImageIcon
            source={{
              uri: image ?? user?.image_path,
            }}
          />
        )}
        <SelectImage>
          <IconStore
            family="FontAwesome"
            icon="picture-o"
            color="#fafafa"
            size={14}
          />
        </SelectImage>
      </RelativeView>
      <Text mb={40} mt={10}>
        Olá, <Bold>{getUserName()}</Bold>!
      </Text>
      <View style={{ width: "100%" }}>
        <Input
          placeholder="Usuário"
          label="nome"
          value={name}
          onChange={setName}
        />
      </View>
      <SubmitButton disabled={buttonText === "salvo"} onPress={handleSubmit}>
        <SubmitText>{buttonText}</SubmitText>
      </SubmitButton>
    </Wrapper>
  );
};

export default Profile;
