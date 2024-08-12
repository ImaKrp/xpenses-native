import React, { useState, useEffect } from "react";
import {
  Wrapper,
  OutFormWrapper,
  ToggleType,
  ToggleTypeText,
  Justify,
  ViewButtons,
  TextTitle,
  TitleColumn,
  ValueWrapper,
  ValueText,
  ValueInput,
  FormWrapper,
  Label,
  DatePickerTextValue,
  DatePickerValue,
  SubmitButton,
  SubmitText,
} from "./styles";
import { TouchableOpacity, ScrollView, View } from "react-native";
import Constants from "expo-constants";
import useTransactionFormStore from "../../store/transactions";
const { statusBarHeight } = Constants;
import Input from "../../components/Input";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { formatMoneyValue } from "../../utils/formatValues";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Picker from "./Picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import transactionsDB from "../../database/Transactions";

const colors_by_types = {
  despesa: "#E5405E",
  receita: "#03DAC6",
};

const Form = ({ navigation, route }) => {
  const type = useTransactionFormStore((state) => state.type);
  const setType = useTransactionFormStore((state) => state.setType);
  const value = useTransactionFormStore((state) => state.value);
  const setValue = useTransactionFormStore((state) => state.setValue);

  const resetForm = useTransactionFormStore((state) => state.resetForm);

  const [data, setData] = useState({});

  const [openDatePicker, setOpenDatePicker] = useState("");

  useEffect(() => {
    setType(route?.params?.type ?? "receita");
    setValue(route?.params?.value ?? 0);

    if (route?.params?.id) {
      const { category_id, color, icon, icon_type } = route?.params;
      const { date, frequency, id, name, title } = route?.params;
      const category = { id: category_id, color, icon, icon_type };

      let newData = {
        category,
        date,
        frequency,
        id,
        name,
        title,
        dateType: "picker",
      };
      setData(newData);
    }
  }, [route]);

  const handleChangeValue = (text) => {
    text = text.replace(/\D/g, "");
    const num = Number(text);
    setValue(num / 100);
  };

  const handleSelectedDate = (type, picked) => {
    let currentDate = new Date();

    if (type === "today") {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      setData({ ...data, dateType: type, date: date?.getTime() });
      currentDate = date;
    }
    if (type === "yesterday") {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      setData({ ...data, dateType: type, date: date?.getTime() - 86400000 });
      currentDate = date;
    }
    if (type === "picker") {
      const date = new Date(picked);
      date.setHours(0, 0, 0, 0);
      setData({ ...data, dateType: type, date: date?.getTime() });
      currentDate = date;
    }

    if (data?.frequency === "recurrent") {
      if (currentDate?.getTime() > data?.recurrent_to) {
        const newData = { ...data };
        delete newData?.frequency;
        delete newData?.recurrent_to;

        setData(newData);
      }
    }
  };

  const handleSelectedFrequency = (type, picked) => {
    if (type === "unique") {
      setData({ ...data, frequency: type });
    }
    if (type === "recurrent") {
      const date = new Date(picked);
      date.setHours(0, 0, 0, 0);
      setData({ ...data, frequency: type, recurrent_to: date?.getTime() });
    }
  };

  const getMinDate = () => {
    if (openDatePicker === "frequency") {
      let date = new Date();
      if (data?.date) date = new Date(data?.date);
      date.setMonth(date?.getMonth() + 1);
      return date;
    }
  };

  const handleCategory = (category) => {
    setData({ ...data, category });
  };

  const isDisabled = () => {
    if (!data?.title) return true;
    if (!data?.category) return true;
    if (!data?.frequency) return true;
    if (!data?.date) return true;
    return false;
  };

  const handleSubmit = () => {
    if (isDisabled()) return;

    if (route?.params?.id) {
      transactionsDB.update({
        title: data?.title,
        category_id: data?.category?.id,
        value,
        date: data?.date,
        type,
        frequency: data?.frequency,
        id: data?.id,
      });
      resetForm();
      navigation.goBack();
      return;
    }

    transactionsDB.create({
      title: data?.title,
      category_id: data?.category?.id,
      value,
      date: data?.date,
      type,
      frequency: data?.frequency,
    });

    if (data?.frequency === "recurrent") {
      const endDate = new Date(data?.recurrent_to);
      const startDate = new Date(data?.date);

      let monthDiff = endDate.getMonth() - startDate.getMonth();
      if (startDate.getFullYear() < endDate.getFullYear())
        monthDiff += (endDate.getFullYear() - startDate.getFullYear()) * 12;

      let loopDate = startDate;

      for (let i = 0; i < monthDiff - 1; i++) {
        loopDate.setMonth(loopDate.getMonth() + 1);
        transactionsDB.create({
          title: data?.title,
          category_id: data?.category?.id,
          value,
          date: loopDate?.getTime(),
          type,
          frequency: data?.frequency,
        });
      }

      transactionsDB.create({
        title: data?.title,
        category_id: data?.category?.id,
        value,
        date: data?.recurrent_to,
        type,
        frequency: data?.frequency,
      });
    }

    resetForm();
    navigation.goBack();
  };

  const pickerValue = () => {
    if (openDatePicker === "date" && data?.dateType === "picker" && data?.date)
      return new Date(data?.date);
    if (
      openDatePicker === "frequency" &&
      data?.frequency === "recurrent" &&
      data?.recurrent_to
    )
      return new Date(data?.recurrent_to);

    return new Date();
  };

  return (
    <>
      <Wrapper color={colors_by_types?.[type]} pt={statusBarHeight}>
        <OutFormWrapper>
          <Justify mb={80}>
            <ToggleType
              onPress={() =>
                setType(type === "despesa" ? "receita" : "despesa")
              }
            >
              <ToggleTypeText color={colors_by_types?.[type]}>
                {type}
              </ToggleTypeText>
            </ToggleType>
            <ViewButtons>
              {route?.params?.id && (
                <TouchableOpacity
                  onPress={() => {
                    transactionsDB.deleteTransaction(route?.params?.id);
                    resetForm();
                    navigation.goBack();
                  }}
                >
                  <ToggleTypeText color="#fafafa">deletar</ToggleTypeText>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                  resetForm();
                }}
              >
                <ToggleTypeText color="#fafafa">cancelar</ToggleTypeText>
              </TouchableOpacity>
            </ViewButtons>
          </Justify>
          <Justify al="flex-end" mb={32}>
            <TitleColumn>
              <TextTitle>valor</TextTitle>
              <ValueWrapper>
                <ValueText>R$ </ValueText>
                <ValueInput
                  value={formatMoneyValue(value)}
                  onChangeText={handleChangeValue}
                />
                <FontAwesome6 name="pencil" size={16} color="#fafafa" />
              </ValueWrapper>
            </TitleColumn>
            <TouchableOpacity onPress={() => navigation.navigate("Calculator")}>
              <MaterialIcons name="calculate" size={32} color="#fafafa" />
            </TouchableOpacity>
          </Justify>
        </OutFormWrapper>
        <FormWrapper>
          <ScrollView>
            <Input
              placeholder="título"
              label="título"
              value={data?.title}
              onChange={(v) => setData({ ...data, title: v })}
            />
            <View>
              <Label>data</Label>
              <ScrollView horizontal={true}>
                <DatePickerValue
                  active={data?.dateType === "today"}
                  onPress={() => handleSelectedDate("today")}
                >
                  <DatePickerTextValue>hoje</DatePickerTextValue>
                </DatePickerValue>
                <DatePickerValue
                  ml={12}
                  active={data?.dateType === "yesterday"}
                  onPress={() => handleSelectedDate("yesterday")}
                >
                  <DatePickerTextValue>ontem</DatePickerTextValue>
                </DatePickerValue>
                <DatePickerValue
                  ml={12}
                  active={data?.dateType === "picker"}
                  onPress={() => setOpenDatePicker("date")}
                >
                  <FontAwesome5 name="calendar" size={24} color="#d0d0d0" />
                  <DatePickerTextValue>
                    {data?.date && data?.dateType === "picker"
                      ? new Date(data?.date).toLocaleDateString("pt-BR")
                      : "selecionar data"}
                  </DatePickerTextValue>
                </DatePickerValue>
              </ScrollView>
            </View>
            <View>
              <Label>categoria</Label>
              <Picker
                setValue={handleCategory}
                value={{
                  id: route?.params?.category_id,
                  color: route?.params?.color,
                  icon: route?.params?.icon,
                  icon_type: route?.params?.icon_type,
                }}
              />
            </View>
            {!route?.params?.id && (
              <View>
                <Label>lançamento</Label>
                <ScrollView horizontal={true}>
                  <DatePickerValue
                    active={data?.frequency === "unique"}
                    onPress={() => handleSelectedFrequency("unique")}
                  >
                    <DatePickerTextValue>único</DatePickerTextValue>
                  </DatePickerValue>
                  <DatePickerValue
                    ml={12}
                    active={data?.frequency === "recurrent"}
                    onPress={() => setOpenDatePicker("frequency")}
                  >
                    <DatePickerTextValue>
                      recorrente
                      {data?.recurrent_to &&
                        data?.frequency === "recurrent" &&
                        " até " +
                          new Date(data?.recurrent_to).toLocaleDateString(
                            "pt-BR"
                          )}
                    </DatePickerTextValue>
                  </DatePickerValue>
                </ScrollView>
              </View>
            )}
            <SubmitButton onPress={handleSubmit} disabled={isDisabled()}>
              <SubmitText>salvar</SubmitText>
            </SubmitButton>
          </ScrollView>
        </FormWrapper>
      </Wrapper>
      {openDatePicker !== "" && (
        <DateTimePicker
          onChange={(e) => {
            if (e?.type === "dismissed") {
              setOpenDatePicker("");
              return;
            }

            if (openDatePicker === "date")
              handleSelectedDate("picker", e?.nativeEvent?.timestamp);

            if (openDatePicker === "frequency")
              handleSelectedFrequency("recurrent", e?.nativeEvent?.timestamp);

            setOpenDatePicker("");
          }}
          value={pickerValue()}
          minimumDate={getMinDate()}
          display="spinner"
          themeVariant="dark"
          locale="pt-BR"
          negativeButton={{ label: "cancelar", textColor: "#fafafa" }}
          positiveButton={{ label: "selecionar", textColor: "#fafafa" }}
        />
      )}
    </>
  );
};

export default Form;
