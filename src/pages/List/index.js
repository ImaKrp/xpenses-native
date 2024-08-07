import React, { useCallback, useState } from "react";
import MonthNav from "../../components/MonthNav";
import useListStore from "../../store/list";
import { useFocusEffect } from "@react-navigation/native";
import transactionsDB from "../../database/Transactions";
import IconStore from "../../components/IconStore";
import { formatMoneyValue } from "../../utils/formatValues";
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
} from "./styles";

const colors_by_types = {
  despesa: "#E5405E",
  receita: "#03DAC6",
};

const List = ({ navigation }) => {
  const date = useListStore((state) => state.date);
  const filter_date = useListStore((state) => state.filter_date);

  const visibility = useListStore((state) => state.visibility);
  const toggleVisibility = useListStore((state) => state.toggleVisibility);

  const [transactions, setTransactions] = useState([]);
  const [prevTransactions, setPrevTransactions] = useState([]);
  const [nextTransactions, setNextTransactions] = useState([]);

  const [loading, setLoading] = useState([]);

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
          transactionsDB.listAll({ date: prev_filter }),
          transactionsDB.listAll({ date: filter_date }),
          transactionsDB.listAll({ date: next_filter }),
        ]);
        setLoading(false);
        setPrevTransactions(res[0]);
        setTransactions(res[1]);
        setNextTransactions(res[2]);
      };
      if (transactions.length === 0) setLoading(true);
      fetch();
    }, [date])
  );

  const toMap = transactions.reduce((x, y) => {
    (x[y.date] = x[y.date] || []).push(y);

    return x;
  }, {});

  const totalByType = transactions.reduce((acc, i) => {
    if (acc[i.type]) {
      acc[i.type] += i.value;
    } else {
      acc[i.type] = i.value;
    }
    return acc;
  }, {});

  const handleChange = (next) => {
    const transactionsCopy = [...transactions];
    if (next.name === "handlePrev") {
      setTransactions(prevTransactions);
      setNextTransactions(transactionsCopy);
    } else {
      setTransactions(nextTransactions);
      setPrevTransactions(transactionsCopy);
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
          {/* <TouchableOpacity>
            <IconStore
              size={22}
              color="#fafafa"
              family="Feather"
              icon="filter"
            />
          </TouchableOpacity> */}
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
      <ScrollView style={{ paddingTop: 32 }}>
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
                          <CategoryColor color={value?.color}>
                            <IconStore
                              size={24}
                              color="#fafafa"
                              family={value?.icon_type}
                              icon={value?.icon}
                            />
                          </CategoryColor>
                          <View style={{ marginLeft: 12 }}>
                            <CardBoldText>{value?.title}</CardBoldText>
                            <CardText>{value?.name}</CardText>
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
    </Wrapper>
  );
};

export default List;
