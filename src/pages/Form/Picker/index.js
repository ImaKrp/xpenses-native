import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import SelectDropdown from "../../../components/LocalSelectDropdown/SelectDropdown";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import categoriesDB from "../../../database/Categories";
import IconStore from "../../../components/IconStore";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

const Picker = ({ setValue, value }) => {
  const [categories, setCategories] = useState([]);
  const [hasSetValue, setHasSetValue] = useState(!!value?.id);

  useEffect(() => {
    if (hasSetValue) setSize(52);
  }, [hasSetValue]);

  const [size, setSize] = useState(0);

  const pickerRef = useRef(null);
  useEffect(() => {
    const fetch = async () => {
      const res = await categoriesDB.listAll();
      setCategories(res);
    };
    fetch();
  }, []);

  const animated = (from, to, ms, times, handler) => {
    if (from === to) return;

    let value = from;

    const duration = ms / times;
    const increment = (to - from) / times;

    const interval = setInterval(() => {
      value += increment;
      handler(Math.round(value));
      if (to > from && Math.round(value) >= to) {
        clearInterval(interval);
        handler(to);
      } else if (to < from && Math.round(value) <= to) {
        clearInterval(interval);
        handler(to);
      }
    }, duration);
  };

  return (
    <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
      <SelectDropdown
        ref={pickerRef}
        data={categories?.sort((a, b) => {
          if (a?.name === "outros" && a?.type == "default") return 1;
          if (b?.name === "outros" && b?.type == "default") return -1;
          return a?.name.localeCompare(b?.name);
        })}
        defaultValueByIndex={categories?.findIndex((i) => i?.id === value?.id)}
        onSelect={(e) => {
          setHasSetValue(true);
          animated(size, 52, 80, 10, setSize);
          setValue(e);
        }}
        renderButton={(selectedItem, isOpen) => {
          return (
            <View
              style={{
                ...styles.dropdown1ButtonStyle,
                width: windowWidth - 36 - size,
              }}
            >
              <View
                style={{
                  height: 30,
                  width: selectedItem ? 30 : 0,
                  borderRadius: 15,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: selectedItem
                    ? selectedItem?.color
                    : "transparent",
                }}
              >
                {selectedItem && (
                  <IconStore
                    icon={selectedItem.icon}
                    family={selectedItem.icon_type}
                    color="#fafafa"
                    size={20}
                  />
                )}
              </View>
              <Text style={styles.dropdown1ButtonTxtStyle}>
                {(selectedItem && selectedItem.name) || "selecione"}
              </Text>
              <Entypo
                name={`chevron-small-${isOpen ? "up" : "down"}`}
                size={28}
                color="#fafafa"
              />
            </View>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <View
              style={{
                ...styles.dropdown1ItemStyle,
                ...(isSelected && { backgroundColor: "#303030" }),
              }}
            >
              <View
                style={{
                  height: 30,
                  width: 30,
                  borderRadius: 15,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: item?.color,
                }}
              >
                <IconStore
                  icon={item.icon}
                  family={item.icon_type}
                  color="#fafafa"
                  size={20}
                />
              </View>

              <Text style={styles.dropdown1ItemTxtStyle}>{item.name}</Text>
            </View>
          );
        }}
        dropdownStyle={styles.dropdown1MenuStyle}
        showsVerticalScrollIndicator={false}
        search
        searchInputStyle={styles.dropdown1SearchInputStyle}
        searchInputTxtColor={"#fafafa"}
        searchPlaceHolder={"digite para pesquisar"}
        searchPlaceHolderColor={"#636161"}
        renderSearchInputLeftIcon={() => {
          return <Ionicons name="search" color="#F8F8F8" size={18} />;
        }}
        dropdownOverlayColor="#00000080"
      />
      {hasSetValue && (
        <TouchableOpacity
          style={{ marginLeft: 20 }}
          onPress={() => {
            animated(size, 0, 80, 10, setSize);
            pickerRef?.current?.reset();
            setValue(null);
          }}
        >
          <MaterialIcons name="highlight-remove" size={32} color="#fafafa" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Picker;

const styles = StyleSheet.create({
  dropdown1ButtonStyle: {
    borderRadius: 24,
    paddingVertical: 6,
    paddingLeft: 6,
    paddingRight: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#636161",
    gap: 8,
  },
  dropdown1ButtonTxtStyle: {
    flex: 1,
    fontSize: 16,
    color: "#d0d0d0",
    textAlign: "left",
    fontFamily: "Montserrat_600SemiBold",
  },
  dropdown1ButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
    color: "#fafafa",
  },
  dropdown1MenuStyle: {
    backgroundColor: "#171717",
    borderRadius: 8,
  },
  dropdown1SearchInputStyle: {
    backgroundColor: "#171717",
    borderBottomWidth: 1,
    borderBottomColor: "#fafafa20",
  },
  dropdown1ItemStyle: {
    flexDirection: "row",
    paddingHorizontal: 12,
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
  },
  dropdown1ItemTxtStyle: {
    fontSize: 14,
    color: "#d0d0d0",
    textAlign: "left",
    fontFamily: "Montserrat_600SemiBold",
  },
  dropdown1ItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
    color: "#fafafa",
  },
});
