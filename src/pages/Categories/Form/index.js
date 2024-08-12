import React, { useState } from "react";
import Input from "../../../components/Input";
import { View, Text } from "react-native";
import {
  Wrapper,
  Label,
  ScrollView,
  ColorSelected,
  Color,
  Row,
  IconSelected,
  Icon,
  SubmitButton,
  SubmitText,
} from "./styles";
import IconStore from "../../../components/IconStore";
import { colors, icons } from "../../../utils/categories";

import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

const Form = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedIcon, setSelectedIcon] = useState(icons[0]);

  return (
    <Wrapper>
      <Input
        label="nome da categoria"
        placeholder="Ex: cofrinho"
        value={name}
        onChange={setName}
      />
      <View>
        <Label>escolha uma cor</Label>
        <ScrollView horizontal={true}>
          {colors &&
            colors.length > 0 &&
            colors.map((color, i) => (
              <ColorSelected
                key={color}
                ml={i > 0 ? 2 : 0}
                color={color === selectedColor ? color : "#191919"}
              >
                <Color color={color} onPress={() => setSelectedColor(color)} />
              </ColorSelected>
            ))}
        </ScrollView>
      </View>
      <View>
        <Label>escolha um ícone</Label>
        <ScrollView horizontal={true}>
          <View>
            {colors &&
              colors.length > 0 &&
              [...Array(3).keys()].map((rowId) => (
                <Row key={rowId} width={windowWidth - 24}>
                  {icons.slice(rowId * 6, (rowId + 1) * 6).map((icon, i) => (
                    <IconSelected
                      key={icon?.icon + i}
                      selected={selectedIcon === icon}
                      color={selectedColor}
                      ml={i > 0 ? 2 : 0}
                    >
                      <Icon
                        selected={selectedIcon === icon}
                        color={selectedColor}
                        onPress={() => setSelectedIcon(icon)}
                      >
                        <IconStore
                          color="#fafafa"
                          icon={icon?.icon}
                          family={icon?.icon_type}
                          size={22}
                        />
                      </Icon>
                    </IconSelected>
                  ))}
                </Row>
              ))}
          </View>
        </ScrollView>
      </View>
      <SubmitButton
        disabled={!name}
        onPress={() =>
          onSubmit({
            name,
            icon: selectedIcon?.icon,
            icon_type: selectedIcon?.icon_type,
            color: selectedColor,
          })
        }
      >
        <SubmitText>salvar</SubmitText>
      </SubmitButton>
    </Wrapper>
  );
};

export default Form;
