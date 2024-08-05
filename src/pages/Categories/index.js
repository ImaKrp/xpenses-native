import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  Wrapper,
  CategoryColor,
  List,
  ListItem,
  ItemInfos,
  ItemIcon,
  ItemTitle,
  TextTitle,
  Bold,
  DivisorLine,
  Scroll,
  CreateCategory,
} from "./styles";
import categoriesDB from "../../database/Categories";
import { TouchableOpacity, ActivityIndicator } from "react-native";
import IconStore from "../../components/IconStore";
import BottomDrawer from "react-native-animated-bottom-drawer";
import Form from "./Form";

const Categories = ({ navigation }) => {
  const bottomDrawerRef = useRef(null);
  const [defaultCategories, setDefaultCategories] = useState([]);
  const [customCategories, setCustomCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleOpenForm = useCallback(() => {
    if (bottomDrawerRef?.current) bottomDrawerRef.current.open();
  }, [bottomDrawerRef]);

  const handleCloseForm = useCallback(() => {
    if (bottomDrawerRef?.current) bottomDrawerRef.current.close();
  }, [bottomDrawerRef]);

  useEffect(() => {
    const fetch = async () => {
      const res = await categoriesDB.listAllDefault();
      setDefaultCategories(res);
    };
    fetch();

    const fetchCustom = async () => {
      const res = await categoriesDB.listAllCustom();
      setCustomCategories(res);
      setLoading(false);
    };
    setLoading(true);
    fetchCustom();
  }, []);

  const fetchCustom = async () => {
    const res = await categoriesDB.listAllCustom();
    setCustomCategories(res);
  };

  const handleSubmit = async (data) => {
    await categoriesDB.create(data);
    handleCloseForm();
    setCustomCategories([
      ...customCategories,
      {
        ...data,
        id:
          customCategories?.length > 0
            ? Number(
                customCategories
                  ?.sort((a, b) => Number(b?.id) - Number(a?.id))
                  ?.at(-1)?.id
              ) + 1
            : 1,
      },
    ]);
    fetchCustom();
  };

  const handleDelete = async (id) => {
    await categoriesDB.deleteCategory(id);
    setCustomCategories(customCategories?.filter((c) => c.id !== id));
  };

  return (
    <Wrapper>
      <Scroll>
        <TextTitle>
          minhas <Bold>categorias</Bold>
        </TextTitle>
        <List mb={12}>
          {loading && (
            <>
              <ActivityIndicator color="#9474ee" />
            </>
          )}
          {customCategories &&
            customCategories?.length > 0 &&
            customCategories
              ?.sort((a, b) => Number(b?.id) - Number(a?.id))
              ?.map((category, i) => (
                <ListItem key={category?.name}>
                  {(loading || i > 0) && <DivisorLine />}
                  <ItemInfos>
                    <ItemIcon>
                      <CategoryColor color={category?.color}>
                        <IconStore
                          size={22}
                          color="#fafafa"
                          family={category?.icon_type}
                          icon={category?.icon}
                        />
                      </CategoryColor>
                      <ItemTitle>
                        <Bold>{category?.name}</Bold>
                      </ItemTitle>
                    </ItemIcon>
                    <TouchableOpacity
                      onPress={() => handleDelete(category?.id)}
                    >
                      <IconStore
                        icon="delete"
                        family="MaterialIcons"
                        color="#fafafa"
                        size={20}
                      />
                    </TouchableOpacity>
                  </ItemInfos>
                </ListItem>
              ))}
          {((customCategories && customCategories?.length > 0) || loading) && (
            <DivisorLine />
          )}
          <CreateCategory onPress={handleOpenForm}>
            <IconStore size={18} color="#fafafa" family="Feather" icon="plus" />
            <ItemTitle>
              criar uma <Bold>categoria</Bold>
            </ItemTitle>
          </CreateCategory>
        </List>
        <TextTitle>
          <Bold>categorias</Bold> padrões
        </TextTitle>
        <List mb={12}>
          {defaultCategories && defaultCategories?.length > 0 ? (
            defaultCategories?.map((category, i) => (
              <ListItem key={category?.name}>
                {i > 0 && <DivisorLine />}
                <ItemInfos>
                  <ItemIcon>
                    <CategoryColor color={category?.color}>
                      <IconStore
                        size={22}
                        color="#fafafa"
                        family={category?.icon_type}
                        icon={category?.icon}
                      />
                    </CategoryColor>
                    <ItemTitle>
                      <Bold>{category?.name}</Bold>
                    </ItemTitle>
                  </ItemIcon>
                </ItemInfos>
              </ListItem>
            ))
          ) : (
            <ActivityIndicator color="#9474ee" />
          )}
        </List>
      </Scroll>
      <BottomDrawer
        ref={bottomDrawerRef}
        snapPoints={[480]}
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
        <Form onSubmit={handleSubmit} />
      </BottomDrawer>
    </Wrapper>
  );
};

export default Categories;
