import React, { useState, useMemo } from "react";
import {
  Wrapper,
  Grid,
  Button,
  Row,
  ButtonText,
  Filler,
  BackNav,
  OperationText,
  ContentHolder,
  BoldTextTitle,
  TextTitle,
  ValueLabel,
  ValueText,
} from "./styles";
import { Dimensions } from "react-native";
import useTransactionFormStore from "../../store";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Constants from "expo-constants";
import { formatMoneyValue } from "../../utils/formatValues";

const windowWidth = Dimensions.get("window").width;
const { statusBarHeight } = Constants;
const areaSize = (windowWidth - 60) / 4;

const colors_by_types = {
  despesa: "#E5405E",
  receita: "#03DAC6",
};

const Calculator = ({ navigation, route }) => {
  const type = useTransactionFormStore((state) => state.type);
  const value = useTransactionFormStore((state) => state.value);
  const setValue = useTransactionFormStore((state) => state.setValue);

  const [input, setInput] = useState(String(value) ?? "0");

  const result = useMemo(() => {
    let current_operation = input.replaceAll("÷", "/");
    current_operation = current_operation.replaceAll("×", "*");

    if (Number.isNaN(Number(current_operation?.at(-1))))
      current_operation = current_operation.slice(0, -1);

    return eval(current_operation);
  }, [input]);

  const handleButtonPress = (value, opt) => {
    if (!value && !opt) return;

    if (opt === "equal") {
      setInput(String(result));
      return;
    }
    if (opt === "clear") setInput("0");
    if (opt === "backspace") {
      setInput(input.slice(0, -1));
    }

    if (!value) return;

    const isNumber = !Number.isNaN(Number(value));

    const currentNumber = input.split(/[^0-9.]/g)?.at(-1);

    if (isNumber) {
      if (!currentNumber || currentNumber?.includes(".")) {
        setInput(input + value);
        return;
      }
      if (Number(currentNumber) === 0 && !currentNumber?.includes(".")) {
        setInput(input.slice(0, -1) + value);
        return;
      }
    }

    if (value === ".") {
      if (currentNumber?.includes(".")) return;

      if (!currentNumber) {
        setInput(input + "0" + value);
        return;
      }
    }

    if (input?.at(-1) === ".") {
      setInput(input.slice(0, -1) + value);
      return;
    }

    if (
      !isNumber &&
      Number.isNaN(Number(input?.at(-1))) &&
      input?.at(-1) !== "."
    ) {
      setInput(input.slice(0, -1) + value);
      return;
    }

    if (!currentNumber) return;

    setInput(input + value);
  };

  return (
    <Wrapper>
      <BackNav top={statusBarHeight} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={30} color="#D0D0D0" />
      </BackNav>
      <ContentHolder>
        <TextTitle>
          qual o <BoldTextTitle>valor</BoldTextTitle> da sua{" "}
          <BoldTextTitle color={colors_by_types?.[type]}>{type}</BoldTextTitle>
        </TextTitle>

        <ValueText>
          <ValueLabel>R$ </ValueLabel>
          {formatMoneyValue(result ?? 0)}
        </ValueText>
      </ContentHolder>

      <Filler>
        <OperationText>{input}</OperationText>
      </Filler>
      <Grid>
        <Row>
          <Button
            height={areaSize}
            width={areaSize}
            color="#AA5665"
            onPress={() => handleButtonPress(null, "clear")}
          >
            <ButtonText>C</ButtonText>
          </Button>
          <Button
            height={areaSize}
            width={areaSize * 2 + 12}
            color="#2F7FA9"
            onPress={() => handleButtonPress(null, "backspace")}
          >
            <MaterialCommunityIcons
              name="backspace-outline"
              size={32}
              color="#fafafa"
            />
          </Button>
          <Button
            height={areaSize}
            width={areaSize}
            onPress={() => handleButtonPress("÷")}
          >
            <FontAwesome6 name="divide" size={32} color="#fafafa" />
          </Button>
        </Row>

        <Row>
          <Button
            height={areaSize}
            width={areaSize}
            onPress={() => handleButtonPress(7)}
          >
            <ButtonText>7</ButtonText>
          </Button>
          <Button
            height={areaSize}
            width={areaSize}
            onPress={() => handleButtonPress(8)}
          >
            <ButtonText>8</ButtonText>
          </Button>
          <Button
            height={areaSize}
            width={areaSize}
            onPress={() => handleButtonPress(9)}
          >
            <ButtonText>9</ButtonText>
          </Button>
          <Button
            height={areaSize}
            width={areaSize}
            onPress={() => handleButtonPress("×")}
          >
            <FontAwesome5 name="times" size={32} color="#fafafa" />
          </Button>
        </Row>
        <Row>
          <Button
            height={areaSize}
            width={areaSize}
            onPress={() => handleButtonPress(4)}
          >
            <ButtonText>4</ButtonText>
          </Button>
          <Button
            height={areaSize}
            width={areaSize}
            onPress={() => handleButtonPress(5)}
          >
            <ButtonText>5</ButtonText>
          </Button>
          <Button
            height={areaSize}
            width={areaSize}
            onPress={() => handleButtonPress(6)}
          >
            <ButtonText>6</ButtonText>
          </Button>
          <Button
            height={areaSize}
            width={areaSize}
            onPress={() => handleButtonPress("-")}
          >
            <FontAwesome6 name="minus" size={32} color="#fafafa" />
          </Button>
        </Row>
        <Row>
          <Button
            height={areaSize}
            width={areaSize}
            onPress={() => handleButtonPress(1)}
          >
            <ButtonText>1</ButtonText>
          </Button>
          <Button
            height={areaSize}
            width={areaSize}
            onPress={() => handleButtonPress(2)}
          >
            <ButtonText>2</ButtonText>
          </Button>
          <Button
            height={areaSize}
            width={areaSize}
            onPress={() => handleButtonPress(3)}
          >
            <ButtonText>3</ButtonText>
          </Button>
          <Button
            height={areaSize}
            width={areaSize}
            onPress={() => handleButtonPress("+")}
          >
            <FontAwesome6 name="plus" size={32} color="#fafafa" />
          </Button>
        </Row>
        <Row>
          <Button
            height={areaSize}
            width={areaSize}
            onPress={() => handleButtonPress(".")}
          >
            <ButtonText>.</ButtonText>
          </Button>
          <Button
            height={areaSize}
            width={areaSize}
            onPress={() => handleButtonPress("0")}
          >
            <ButtonText>0</ButtonText>
          </Button>
          <Button
            height={areaSize}
            width={areaSize}
            onPress={() => handleButtonPress(null, "equal")}
          >
            <ButtonText>=</ButtonText>
          </Button>
          <Button
            height={areaSize}
            width={areaSize}
            color="#0B8C80"
            onPress={() => {
              setValue(Number(result));
              navigation.goBack();
            }}
          >
            <Feather name="check" size={40} color="#fafafa" />
          </Button>
        </Row>
      </Grid>
    </Wrapper>
  );
};

export default Calculator;
