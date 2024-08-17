import styled from "styled-components/native";

export const Wrapper = styled.View`
  padding: ${({ mtop }) => `${mtop + 71}px`} 0 0;
  background-color: ${({ color }) => `${color}33`};
  flex: 1;
`;

export const ToggleType = styled.TouchableOpacity`
  padding: 8px 16px;
  background-color: #191919;
  border-radius: 20px;
`;

export const ToggleTypeText = styled.Text`
  color: ${({ color }) => `${color}`};
  font-size: 14px;
  font-family: Montserrat_600SemiBold;
`;

export const SubTitle = styled.Text`
  font-family: Montserrat_400Regular;
  font-size: 12px;
  color: #e0e0e0;
`;

export const TextTitle = styled.Text`
  font-family: Montserrat_400Regular;
  font-size: 16px;
  color: #fafafa;
`;

export const Bold = styled.Text`
  font-family: Montserrat_600SemiBold;
  color: ${({ color }) => color ?? "#fafafa"};
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: ${({ mb }) => `${mb}px`};
  gap: 10px;
  padding: ${({ pd }) => `${pd ?? 0}px`};
`;

export const CartTitle = styled.View`
  padding: 0 12px 5px;
  margin-bottom: 6px;
`;

export const FooterWrapper = styled.View`
  background-color: #101010;
  padding: 0 12px;
`;
export const FooterContent = styled.View`
  padding: 14px 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CategoryColor = styled.View`
  height: ${({ size }) => size ?? "28"}px;
  width: ${({ size }) => size ?? "28"}px;
  border-radius: 23px;
  align-items: center;
  justify-content: center;
  background-color: ${({ color }) => color};
`;

export const CardText = styled.Text`
  font-family: Montserrat_400Regular;
  font-size: 12px;
  color: #fafafa;
`;

export const CardBoldText = styled.Text`
  font-size: 14px;
  font-family: Montserrat_600SemiBold;
  color: ${({ color }) => color ?? "#fafafa"};
`;

export const BalanceCard = styled.View`
  background-color: #101010;
  padding: 8px;
  border-radius: 14px;
  margin-bottom: ${({ mb }) => (mb ? "16px" : 0)};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 2;
`;

export const IconColor = styled.View`
  height: 48px;
  width: 48px;
  border-radius: 6px;
  background-color: ${({ color }) => color};
  align-items: center;
  justify-content: center;
  margin-right: 6px;
`;

export const CardsColumn = styled.View`
  gap: 8px;
  margin: 16px 0 0;
`;

export const CardsRow = styled.View`
  gap: 8px;
  flex-direction: row;
`;

export const InnerWrapper = styled.View`
  background-color: #191919;
  flex: 1;
  border-radius: 20px 20px 0 0;
  margin-top: 12px;
`;

export const PercentWrapper = styled.View`
  width: 100%;
  height: 6px;
  overflow: hidden;
  border-radius: 6px;
  background-color: #d0d0d020;
  margin-top: 8px;
`;
export const PercentFiller = styled.View`
  background-color: ${({ color }) => color};
  width: ${({ width }) => width ?? 0}%;
  height: 6px;
  border-radius: 6px;
`;
