import React, { useState, useEffect } from "react";
import Input from "../../../components/Input";
import { View } from "react-native";
import Picker from "../Picker";
import { Wrapper, SubmitButton, SubmitText, Row, Label } from "./styles";

import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

const animated = (from, to, ms, times, handler, running, setRunning) => {
  if (running) return;

  if (from === to) {
    setRunning(false);
    return;
  }

  setRunning(true);

  let value = from;

  const duration = ms / times;
  const increment = (to - from) / times;

  const interval = setInterval(() => {
    value += increment;
    handler(Math.round(value));
    if (to > from && Math.round(value) >= to) {
      setRunning(false);
      clearInterval(interval);
      handler(to);
    } else if (to < from && Math.round(value) <= to) {
      setRunning(false);
      clearInterval(interval);
      handler(to);
    }
  }, duration);
};

const Form = ({ values, onSubmit, onClose }) => {
  const [data, setData] = useState(values);
  const [animating, setAnimating] = useState(false);

  const [widthApply, setWidthApply] = useState(windowWidth - 24);

  useEffect(() => {
    if (data?.title || data?.category_id) {
      animated(
        widthApply,
        (windowWidth - 24 - 16) / 2,
        30,
        10,
        setWidthApply,
        animating,
        setAnimating
      );
    } else {
      animated(
        widthApply,
        windowWidth - 24,
        30,
        10,
        setWidthApply,
        animating,
        setAnimating
      );
    }
  }, [data]);

  return (
    <Wrapper>
      <Input
        placeholder="título"
        label="título"
        value={data?.title}
        onChange={(v) => setData({ ...data, title: v })}
      />
      <View>
        <Label>categoria</Label>
        <Picker
          value={{ id: data?.category_id }}
          setValue={(v) => setData({ ...data, category_id: v?.id })}
        />
      </View>
      <Row>
        <SubmitButton onPress={() => onSubmit(data)} width={widthApply}>
          <SubmitText>aplicar</SubmitText>
        </SubmitButton>
        <SubmitButton
          gray
          onPress={() => {
            setData({});
            setTimeout(() => onSubmit({}), 50);
          }}
          width={(windowWidth - 24 - 16) / 2}
        >
          <SubmitText>limpar</SubmitText>
        </SubmitButton>
      </Row>
    </Wrapper>
  );
};

export default Form;
