import React from "react";
import { TouchableOpacity } from "react-native";
import IconStore from "../IconStore";
import useListStore from "../../store/list";
import { Wrapper, Filler, PressableTexts } from "./styles";

const MonthNav = ({ margin }) => {
  const date = useListStore((state) => state.date);
  const setDate = useListStore((state) => state.setDate);

  const handleNext = () => {
    const tempDate = new Date(date);
    tempDate.setMonth(date.getMonth() + 1);
    setDate(tempDate);
  };
  const handlePrev = () => {
    const tempDate = new Date(date);
    tempDate.setMonth(date.getMonth() - 1);
    setDate(tempDate);
  };

  const getRelationName = (position) => {
    if (position === "current") {
      return date.toLocaleString("pt-BR", { month: "long" });
    }
    if (position === "prev") {
      const tempDate = new Date(date);
      tempDate.setMonth(date.getMonth() - 1);
      return tempDate.toLocaleString("pt-BR", { month: "long" });
    }
    if (position === "next") {
      const tempDate = new Date(date);
      tempDate.setMonth(date.getMonth() + 1);
      return tempDate.toLocaleString("pt-BR", { month: "long" });
    }
  };

  return (
    <Wrapper margin>
      <TouchableOpacity onPress={handlePrev}>
        <IconStore
          color="#D0D0D0"
          family="MaterialCommunityIcons"
          icon="arrow-left-circle-outline"
          size={30}
        />
      </TouchableOpacity>
      <Filler>
        <TouchableOpacity onPress={handlePrev}>
          <PressableTexts>{getRelationName("prev")}</PressableTexts>
        </TouchableOpacity>
        <PressableTexts active>{getRelationName("current")}</PressableTexts>
        <TouchableOpacity onPress={handleNext}>
          <PressableTexts>{getRelationName("next")}</PressableTexts>
        </TouchableOpacity>
      </Filler>
      <TouchableOpacity onPress={handleNext}>
        <IconStore
          color="#D0D0D0"
          family="MaterialCommunityIcons"
          icon="arrow-right-circle-outline"
          size={30}
        />
      </TouchableOpacity>
    </Wrapper>
  );
};

export default MonthNav;
