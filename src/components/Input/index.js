import React from "react";
import { View } from "react-native";
import { TextInput, Label } from "./styles";

const Input = ({ value, onChange, label, placeholder, ...props }) => {
  return (
    <View>
      {label && <Label>{label}</Label>}
      <TextInput
        onChangeText={onChange}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#636161"
        {...props}
      />
    </View>
  );
};

export default Input;
