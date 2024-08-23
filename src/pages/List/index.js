import React, { useCallback, useState, useRef } from "react";
import MonthNav from "../../components/MonthNav";
import useListStore from "../../store/list";
import { useFocusEffect } from "@react-navigation/native";
import transactionsDB from "../../database/Transactions";
import IconStore from "../../components/IconStore";
import { formatMoneyValue } from "../../utils/formatValues";
import Form from "./FilterForm";
import BottomDrawer from "react-native-animated-bottom-drawer";
import {
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import {
  Wrapper,
  TextTitle,
  Row,
  Bold,
  SubTitle,
  CartTitle,
  FooterContent,
  FooterWrapper,
  CategoryColor,
  CardText,
  CardBoldText,
  RelativeTouchable,
  Indicator,
} from "./styles";

const colors_by_types = {
  despesa: "#E5405E",
  receita: "#03DAC6",
};

const List = ({ navigation }) => {
  const bottomDrawerRef = useRef(null);

  const handleOpenForm = useCallback(() => {
    if (bottomDrawerRef?.current) bottomDrawerRef.current.open();
  }, [bottomDrawerRef]);

  const handleCloseForm = useCallback(() => {
    if (bottomDrawerRef?.current) bottomDrawerRef.current.close();
  }, [bottomDrawerRef]);

  const date = useListStore((state) => state.date);
  const filter_date = useListStore((state) => state.filter_date);
  const visibility = useListStore((state) => state.visibility);

  const toggleVisibility = useListStore((state) => state.toggleVisibility);
  const setData = useListStore((state) => state.setData);
  const setPrevData = useListStore((state) => state.setPrevData);
  const setNextData = useListStore((state) => state.setNextData);

  const data = useListStore((state) => state.data);
  const prev_data = useListStore((state) => state.prev_data);
  const next_data = useListStore((state) => state.next_data);

  const [loading, setLoading] = useState([]);

  const [filter, setFilter] = useState({});

  useFocusEffect(
    useCallback(() => {
      const generateFilter = (type, date) => {
        const next_date = new Date(date);
        next_date.setDate(1);
        next_date.setHours(0, 0, 0, 0);
        if (type === "next") next_date.setMonth(next_date.getMonth() + 1);
        if (type === "prev") next_date.setMonth(next_date.getMonth() - 1);

        const finalDate = new Date(next_date);
        finalDate.setMonth(finalDate.getMonth() + 1);
        finalDate.setDate(0);
        finalDate.setHours(0, 0, 0, 0);

        return [next_date.getTime(), finalDate.getTime()];
      };

      const fetch = async () => {
        const next_filter = generateFilter("next", date);
        const prev_filter = generateFilter("prev", date);

        const res = await Promise.all([
          transactionsDB.listAll({ ...filter, date: prev_filter }),
          transactionsDB.listAll({ ...filter, date: filter_date }),
          transactionsDB.listAll({ ...filter, date: next_filter }),
        ]);
        setLoading(false);
        setPrevData(res[0]);
        setData(res[1]);
        setNextData(res[2]);
      };
      if (data.length === 0) setLoading(true);
      fetch();
    }, [date, filter])
  );

  const toMap = data.reduce((x, y) => {
    (x[y.date] = x[y.date] || []).push(y);

    return x;
  }, {});

  const totalByType = data.reduce((acc, i) => {
    if (acc[i.type]) {
      acc[i.type] += i.value;
    } else {
      acc[i.type] = i.value;
    }
    return acc;
  }, {});

  const handleChange = (next) => {
    const transactionsCopy = [...data];
    if (next.name === "handlePrev") {
      setData(prev_data);
      setNextData(transactionsCopy);
    } else {
      setData(next_data);
      setPrevData(transactionsCopy);
    }
    next();
  };

  return (
    <Wrapper>
      <Row mb={16} pd={12}>
        <View>
          <SubTitle>seus lançamentos</SubTitle>
          <TextTitle>
            <Bold>mensais</Bold>
          </TextTitle>
        </View>
        <Row>
          <TextTitle>
            {date?.toLocaleString("pt-BR", { month: "short" })}{" "}
            <Bold>{date?.getFullYear()}</Bold>
          </TextTitle>
          <RelativeTouchable onPress={handleOpenForm}>
            {(filter?.title || filter?.category_id) && <Indicator />}
            <IconStore
              size={22}
              color="#fafafa"
              family="Feather"
              icon="filter"
            />
          </RelativeTouchable>
          <TouchableOpacity onPress={() => toggleVisibility(visibility)}>
            <IconStore
              size={22}
              color="#fafafa"
              family="Ionicons"
              icon={visibility ? "eye-outline" : "eye-off-outline"}
            />
          </TouchableOpacity>
        </Row>
      </Row>

      <MonthNav margin onChange={handleChange} />
      <ScrollView style={{ marginTop: 20 }}>
        <View style={{ gap: 20, paddingBottom: 60 }}>
          {loading && <ActivityIndicator color="#9474ee" />}
          {toMap &&
            Object.keys(toMap)?.length > 0 &&
            Object.keys(toMap)?.map((key) => (
              <View
                key={key}
                style={{ backgroundColor: "#101010", padding: 12 }}
              >
                <CartTitle
                  style={{ borderBottomColor: "#1D1D1D", borderBottomWidth: 2 }}
                >
                  <TextTitle>
                    <Bold>
                      {new Date(Number(key)).toLocaleDateString("pt-BR", {
                        weekday: "short",
                        month: "long",
                        day: "2-digit",
                      })}
                    </Bold>
                  </TextTitle>
                </CartTitle>
                <View style={{ gap: 16 }}>
                  {toMap[key]?.length > 0 &&
                    toMap[key]?.map((value) => (
                      <TouchableOpacity
                        key={value?.id}
                        onPress={() => navigation.navigate("Form", value)}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <CategoryColor color={value?.color ?? "#6F6F6F"}>
                            <IconStore
                              size={24}
                              color="#fafafa"
                              family={
                                value?.icon_type ?? "MaterialCommunityIcons"
                              }
                              icon={value?.icon ?? "dots-horizontal"}
                            />
                          </CategoryColor>
                          <View style={{ marginLeft: 12 }}>
                            <CardBoldText>{value?.title}</CardBoldText>
                            <CardText>{value?.name ?? "outros"}</CardText>
                          </View>
                        </View>
                        <View
                          style={{ marginRight: 4, alignItems: "flex-end" }}
                        >
                          <CardBoldText color={colors_by_types?.[value?.type]}>
                            R${" "}
                            {visibility
                              ? formatMoneyValue(value?.value)
                              : "***"}
                          </CardBoldText>
                          <CardText>
                            {value?.frequency === "unique"
                              ? "único"
                              : "recorrente"}
                          </CardText>
                        </View>
                      </TouchableOpacity>
                    ))}
                </View>
              </View>
            ))}
          {!loading && (!toMap || Object.keys(toMap)?.length === 0) && (
            <View
              style={{
                flex: 1,
                paddingVertical: 40,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconStore
                size={24}
                color="#636161"
                family="Entypo"
                icon="emoji-sad"
              />
              <CardBoldText color="#636161" style={{ marginTop: 18 }}>
                nenhuma transação encontrada
              </CardBoldText>
              <CardBoldText color="#636161">no período</CardBoldText>
            </View>
          )}
        </View>
      </ScrollView>
      <FooterWrapper
        style={{
          borderTopColor: "#1D1D1D",
          borderTopWidth: 2,
        }}
      >
        <FooterContent
          style={{
            borderBottomColor: "#1D1D1D",
            borderBottomWidth: 2,
          }}
        >
          <View />
          <View style={{ alignItems: "center" }}>
            <CardBoldText color={colors_by_types?.receita}>
              R$ {visibility ? formatMoneyValue(totalByType?.receita) : "***"}
            </CardBoldText>
            <CardText>receitas</CardText>
          </View>
          <View />
          <View style={{ alignItems: "center" }}>
            <CardBoldText color={colors_by_types?.despesa}>
              R$ {visibility ? formatMoneyValue(totalByType?.despesa) : "***"}
            </CardBoldText>
            <CardText>despesas</CardText>
          </View>
          <View />
        </FooterContent>
      </FooterWrapper>
      <BottomDrawer
        ref={bottomDrawerRef}
        snapPoints={[287]}
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
        <Form
          values={{ ...filter }}
          onClose={handleCloseForm}
          onSubmit={(v) => {
            setLoading(true);
            setFilter(v);
            handleCloseForm();
          }}
        />
      </BottomDrawer>
    </Wrapper>
  );
};

export default List;
