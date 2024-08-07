import styled from "styled-components/native";

export const Wrapper = styled.View`
  flex: 1;
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
  height: 36px;
  width: 36px;
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
