import styled from "styled-components/native";

export const Wrapper = styled.View`
  background-color: #191919;
  flex: 1;
  padding: 12px;
`;

export const Scroll = styled.ScrollView`
  flex: 1;
`;

export const CategoryColor = styled.View`
  height: 30px;
  width: 30px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => color};
`;

export const List = styled.View`
  background-color: #101010;
  gap: 8px;
  border-radius: 8px;
  padding: 16px;
  margin-top: 8px;
  margin-bottom: ${({ mb }) => (mb ? `${mb}px` : 0)};
`;

export const DivisorLine = styled.View`
  width: 100%;
  height: 2px;
  background-color: #1d1d1d;
  margin-bottom: 8px;
`;

export const ListItem = styled.View``;

export const ItemInfos = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ItemIcon = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const ItemTitle = styled.Text`
  font-family: Montserrat_400Regular;
  font-size: 14px;
  color: #fafafa;
`;

export const TextTitle = styled.Text`
  font-family: Montserrat_400Regular;
  font-size: 16px;
  color: #fafafa;
`;

export const Bold = styled.Text`
  font-family: Montserrat_600SemiBold;
`;

export const CreateCategory = styled.TouchableOpacity`
  width: 100%;
  height: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
