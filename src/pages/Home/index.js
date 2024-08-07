import React, { useCallback, useState } from "react";
import MonthNav from "../../components/MonthNav";
import useListStore from "../../store/list";
import { useFocusEffect } from "@react-navigation/native";
import transactionsDB from "../../database/Transactions";
import IconStore from "../../components/IconStore";
import { formatMoneyValue } from "../../utils/formatValues";
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  Wrapper,
  TextTitle,
  Row,
  Bold,
  SubTitle,
  CartTitle,
  CategoryColor,
  CardText,
  CardBoldText,
  BalanceCard,
  IconColor,
  CardsColumn,
  CardsRow,
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
  const [nextTransactions, setNextTransactions] = useState([]);

  const [loading, setLoading] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const generateNextFilter = (date) => {
        const next_date = new Date(date);
        next_date.setDate(1);
        next_date.setHours(0, 0, 0, 0);
        next_date.setMonth(next_date.getMonth() + 1);

        const finalDate = new Date(next_date);
        finalDate.setMonth(finalDate.getMonth() + 1);
        finalDate.setDate(0);
        finalDate.setHours(0, 0, 0, 0);

        return [next_date.getTime(), finalDate.getTime()];
      };

      const fetch = async () => {
        const next_filter = generateNextFilter(date);
        const res = await Promise.all([
          transactionsDB.listAll({ date: filter_date }),
          transactionsDB.listAll({ date: next_filter }),
        ]);

        setLoading(false);
        setTransactions(res[0]);
        setNextTransactions(res[1]);
      };
      setTransactions([]);
      setLoading(true);
      fetch();
    }, [date])
  );

  const toMap = transactions?.slice(0, 3)?.reduce((x, y) => {
    (x[y.date] = x[y.date] || []).push(y);

    return x;
  }, {});

  const totalByType = transactions.reduce(
    (acc, i) => {
      if (acc[i.type]) {
        acc[i.type] += i.value;
      } else {
        acc[i.type] = i.value;
      }
      return acc;
    },
    { receita: 0, despesa: 0 }
  );

  const nextMonth = nextTransactions?.reduce(
    (acc, i) => {
      if (acc[i.type]) {
        acc[i.type] += i.value;
      } else {
        acc[i.type] = i.value;
      }
      return acc;
    },
    { receita: 0, despesa: 0 }
  );

  const balance = (totalByType?.receita ?? 0) - (totalByType?.despesa ?? 0);
  const projected = balance + (nextMonth?.receita - nextMonth?.despesa);

  const showValue = (value) => {
    if (!visibility) return "***";
    if (loading) return "-";
    return formatMoneyValue(value);
  };

  return (
    <ScrollView>
      <Wrapper>
        <Row mb={16}>
          <TextTitle>
            <Bold>
              {date?.toLocaleString("pt-BR", { month: "long" })}{" "}
              {date?.getFullYear()}
            </Bold>
          </TextTitle>
        </Row>
        <BalanceCard mb>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconColor color="#1E1E1E">
              <IconStore
                size={34}
                color="#fafafa"
                family="MaterialCommunityIcons"
                icon="piggy-bank-outline"
              />
            </IconColor>
            <View>
              <SubTitle>saldo atual</SubTitle>
              <TextTitle>
                <Bold color={visibility && balance < 0 ? "#E5405E" : "#fafafa"}>
                  R$ {showValue(balance)}
                </Bold>
              </TextTitle>
            </View>
          </View>
          <TouchableOpacity
            style={{
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => toggleVisibility(visibility)}
          >
            <IconStore
              size={24}
              color="#fafafa"
              family="Ionicons"
              icon={visibility ? "eye-outline" : "eye-off-outline"}
            />
          </TouchableOpacity>
        </BalanceCard>
        <MonthNav />
        <CardsColumn>
          <CardsRow>
            <BalanceCard>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconColor color="#03DAC633">
                  <IconStore
                    size={34}
                    color="#03DAC6"
                    family="MaterialCommunityIcons"
                    icon="currency-usd"
                  />
                </IconColor>
                <View>
                  <SubTitle>receitas</SubTitle>
                  <TextTitle>
                    <Bold>R$ {showValue(totalByType?.receita)}</Bold>
                  </TextTitle>
                </View>
              </View>
            </BalanceCard>
            <BalanceCard>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconColor color="#E5405E33">
                  <IconStore
                    size={34}
                    color="#E5405E"
                    family="MaterialCommunityIcons"
                    icon="currency-usd"
                  />
                </IconColor>
                <View>
                  <SubTitle>despesas</SubTitle>
                  <TextTitle>
                    <Bold>R$ {showValue(totalByType?.despesa)}</Bold>
                  </TextTitle>
                </View>
              </View>
            </BalanceCard>
          </CardsRow>
          <CardsRow>
            <BalanceCard>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconColor color="#39ACE733">
                  <IconStore
                    size={34}
                    color="#39ACE7"
                    family="MaterialCommunityIcons"
                    icon="currency-usd"
                  />
                </IconColor>
                <View>
                  <SubTitle>a receber</SubTitle>
                  <TextTitle>
                    <Bold>R$ {showValue(nextMonth?.receita)}</Bold>
                  </TextTitle>
                </View>
              </View>
            </BalanceCard>
            <BalanceCard>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconColor color="#CFC46633">
                  <IconStore
                    size={34}
                    color="#CFC466"
                    family="MaterialCommunityIcons"
                    icon="currency-usd"
                  />
                </IconColor>
                <View>
                  <SubTitle>a pagar</SubTitle>
                  <TextTitle>
                    <Bold>R$ {showValue(nextMonth?.despesa)}</Bold>
                  </TextTitle>
                </View>
              </View>
            </BalanceCard>
          </CardsRow>
          <BalanceCard>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconColor color="#CECECE33">
                <IconStore
                  size={34}
                  color="#CECECE"
                  family="MaterialCommunityIcons"
                  icon="plus-minus-variant"
                />
              </IconColor>
              <View>
                <SubTitle>projetado</SubTitle>
                <TextTitle>
                  <Bold
                    color={visibility && projected < 0 ? "#E5405E" : "#fafafa"}
                  >
                    R$ {showValue(projected)}
                  </Bold>
                </TextTitle>
              </View>
            </View>
          </BalanceCard>
        </CardsColumn>
      </Wrapper>
      <ScrollView style={{ paddingTop: 16 }}>
        <View style={{ gap: 20, paddingBottom: 24 }}>
          {loading && <ActivityIndicator color="#9474ee" />}
          {toMap &&
            Object.keys(toMap)?.length > 0 &&
            Object.keys(toMap)?.map((key) => (
              <View
                key={key}
                style={{ backgroundColor: "#101010", padding: 12 }}
              >
                <CartTitle
                  style={{
                    borderBottomColor: "#1D1D1D",
                    borderBottomWidth: 2,
                  }}
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
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                          }}
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
          {toMap && Object.keys(toMap)?.length > 0 && (
            <TouchableOpacity
              style={{ width: "100%", alignItems: "center" }}
              onPress={() => navigation.navigate("List")}
            >
              <IconStore
                icon="dots-horizontal"
                family="MaterialCommunityIcons"
                color="#fafafa"
              />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </ScrollView>
  );
};

export default List;
