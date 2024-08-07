import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import SelectDropdown from "../../../components/LocalSelectDropdown/SelectDropdown";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import categoriesDB from "../../../database/Categories";
import IconStore from "../../../components/IconStore";

const Picker = ({ setValue, value }) => {
  const [categories, setCategories] = useState([]);
  const pickerRef = useRef(null);
  useEffect(() => {
    const fetch = async () => {
      const res = await categoriesDB.listAll();
      setCategories(res);
    };
    fetch();
  }, []);

  return (
    <View style={{ flexDirection: "row", flex: 1, alignItems: "center" }}>
      <SelectDropdown
        ref={pickerRef}
        data={categories?.sort((a, b) => {
          if (a?.name === "outros" && a?.type == "default") return 1;
          if (b?.name === "outros" && b?.type == "default") return -1;
          return a?.name.localeCompare(b?.name);
        })}
        defaultValue={value}
        onSelect={setValue}
        renderButton={(selectedItem, isOpen) => {
          return (
            <View style={styles.dropdown1ButtonStyle}>
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
      {value && (
        <TouchableOpacity
          style={{ marginLeft: 20 }}
          onPress={() => {
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
    flex: 1,
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
