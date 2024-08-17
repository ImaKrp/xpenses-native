import React, { useCallback, useState, useMemo } from "react";
import MonthNav from "../../components/MonthNav";
import useListStore from "../../store/list";
import { useFocusEffect } from "@react-navigation/native";
import transactionsDB from "../../database/Transactions";
import { PieChart } from "react-native-gifted-charts";
import IconStore from "../../components/IconStore";
import { formatMoneyValue } from "../../utils/formatValues";
import Constants from "expo-constants";
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Text,
  Dimensions,
} from "react-native";
import {
  Wrapper,
  TextTitle,
  Row,
  Bold,
  PercentFiller,
  PercentWrapper,
  CategoryColor,
  CardText,
  CardBoldText,
  ToggleType,
  ToggleTypeText,
  InnerWrapper,
} from "./styles";

const { statusBarHeight } = Constants;

const windowWidth = Dimensions.get("window").width;

const colors_by_types = {
  despesa: "#E5405E",
  receita: "#03DAC6",
};

const RenderLegendComponent = ({ data }) => {
  return (
    <View
      style={{
        flex: 1,
        gap: 8,
        paddingHorizontal: 20,
      }}
    >
      {data &&
        data?.length > 0 &&
        data?.map((value) => (
          <View
            key={value?.name}
            style={{
              flexDirection: "row",
              alignItems: "center",
              flex: 1,
            }}
          >
            <CategoryColor color={value?.color}>
              <IconStore
                size={20}
                color="#fafafa"
                family={value?.icon_type}
                icon={value?.icon}
              />
            </CategoryColor>
            <View
              style={{
                flexDirection: "row",
                marginLeft: 12,
                alignItems: "center",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <CardBoldText>{value?.name}</CardBoldText>
              <CardText>{value?.percent?.toFixed(2)}%</CardText>
            </View>
          </View>
        ))}
    </View>
  );
};

const Analysis = ({ navigation }) => {
  const [type, setType] = useState("receita");

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
          transactionsDB.listAll({ date: prev_filter, type }),
          transactionsDB.listAll({ date: filter_date, type }),
          transactionsDB.listAll({ date: next_filter, type }),
        ]);

        setLoading(false);
        setPrevData(res[0]);
        setData(res[1]);
        setNextData(res[2]);
      };
      if (data.length === 0) setLoading(true);
      fetch();
    }, [date, type])
  );

  let totalSum = 0;

  const totalByCategory = data.reduce((acc, i) => {
    if (acc[i.name]) {
      acc[i.name].value += i.value;
    } else {
      acc[i.name] = {
        name: i.name,
        value: i.value,
        icon: i.icon,
        icon_type: i.icon_type,
        color: i.color,
      };
    }
    totalSum += i.value;
    return acc;
  }, {});

  const mappedData = Object.values(totalByCategory)
    ?.sort((a, b) => b.value - a.value)
    ?.filter((item) => item.value > 0)
    ?.map((item) => {
      let percent = (item.value * 100) / totalSum;
      percent = Number(percent.toFixed(3));
      return { ...item, percent };
    });

  const toMap = useMemo(() => {
    const shoudMapTopFive = () => {
      const hasOthers = mappedData?.find((item) => item.name === "outros");

      const newData = mappedData?.filter((item) => item.name !== "outros");

      const othersData = hasOthers
        ? [...newData.splice(4, newData?.length - 4), hasOthers]
        : [...newData.splice(4, newData?.length - 4)];

      const othersValue = othersData.reduce(
        (acc, item) => {
          acc.value += item.value;
          return acc;
        },
        {
          color: "#6F6F6F",
          icon: "dots-horizontal",
          icon_type: "MaterialCommunityIcons",
          name: "outros",
          value: 0,
        }
      );

      let percent = (othersValue.value * 100) / totalSum;
      percent = Number(percent.toFixed(3));

      othersWithPerformance = {
        ...othersValue,
        percent,
      };
      newData.push(othersWithPerformance);

      return newData;
    };

    return mappedData?.length > 5 ? shoudMapTopFive() : mappedData;
  }, [mappedData]);

  const showValue = (value) => {
    if (!visibility) return "***";
    if (loading) return "-";
    return formatMoneyValue(value);
  };

  const handleChange = (next) => {
    const transactionsCopy = [...data];
    if (next.name === "handlePrev") {
      setLoading(true);
      setData(prev_data);
      setNextData(transactionsCopy);
    } else {
      setLoading(true);
      setData(next_data);
      setPrevData(transactionsCopy);
    }
    next();
  };

  return (
    <Wrapper mtop={statusBarHeight} color={colors_by_types?.[type]}>
      <Row mb={16} pd={"0 12px 0"}>
        <TextTitle>
          <Bold>
            {date?.toLocaleString("pt-BR", { month: "long" })}{" "}
            {date?.getFullYear()}
          </Bold>
        </TextTitle>
        <ToggleType
          onPress={() => {
            setData([]);
            setType(type === "despesa" ? "receita" : "despesa");
          }}
        >
          <ToggleTypeText color={colors_by_types?.[type]}>
            {`${type}s`}
          </ToggleTypeText>
        </ToggleType>
      </Row>
      <MonthNav margin onChange={handleChange} />
      <InnerWrapper>
        <ScrollView>
          <View style={{ paddingTop: 32 }}>
            <View style={{ gap: 10, paddingBottom: 24, paddingHorizontal: 8 }}>
              {loading && <ActivityIndicator color="#9474ee" />}
              {!loading && (!toMap || toMap?.length === 0) && (
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
              <View style={{ flexDirection: "row" }}>
                <PieChart
                  data={toMap}
                  donut
                  radius={80}
                  innerRadius={60}
                  innerCircleColor="#191919"
                  strokeWidth={2}
                  strokeColor="#191919"
                  centerLabelComponent={() => {
                    return (
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <CardBoldText>R$ {showValue(totalSum)}</CardBoldText>
                      </View>
                    );
                  }}
                />
                <RenderLegendComponent data={toMap} />
              </View>

              {toMap && toMap?.length > 0 && (
                <>
                  <View
                    style={{
                      marginTop: 20,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderBottomColor: "#9d9d9d20",
                      borderBottomWidth: 2,
                    }}
                  >
                    <TextTitle>por categoria</TextTitle>
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
                  </View>

                  <View
                    style={{
                      flex: 1,
                      gap: 7,
                      paddingHorizontal: 10,
                    }}
                  >
                    {mappedData &&
                      mappedData?.length > 0 &&
                      mappedData
                        ?.sort((a, b) => {
                          if (a?.name === "outros") return 1;
                          if (b?.name === "outros") return -1;
                          return b.value - a.value;
                        })
                        ?.map((value, i) => (
                          <View
                            key={value?.name}
                            style={{
                              flexDirection: "column",
                              alignItems: "center",
                              flex: 1,
                              borderTopColor: "#9d9d9d20",
                              borderTopWidth: i > 0 ? 2 : 0,
                              paddingTop: i > 0 ? 7 : 0,
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <CategoryColor color={value?.color} size={34}>
                                <IconStore
                                  size={24}
                                  color="#fafafa"
                                  family={value?.icon_type}
                                  icon={value?.icon}
                                />
                              </CategoryColor>
                              <View
                                style={{
                                  flexDirection: "row",
                                  marginLeft: 12,
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  flex: 1,
                                }}
                              >
                                <CardBoldText>
                                  {value?.name}{" "}
                                  <CardText>
                                    {value?.percent?.toFixed(2)}%
                                  </CardText>
                                </CardBoldText>
                                <CardText>
                                  R$ {showValue(value?.value)}
                                </CardText>
                              </View>
                            </View>
                            <PercentWrapper>
                              <PercentFiller
                                width={value?.percent}
                                color={value?.color}
                              />
                            </PercentWrapper>
                          </View>
                        ))}
                  </View>
                </>
              )}
            </View>
          </View>
        </ScrollView>
      </InnerWrapper>
    </Wrapper>
  );
};

export default Analysis;
