import styled from "styled-components/native";

export const Wrapper = styled.View`
  background-color: #191919;
  flex: 1;
  padding: 12px;
`;

export const Grid = styled.View`
  gap: 12px;
`;

export const Row = styled.View`
  gap: 12px;
  flex-direction: row;
`;

export const BackNav = styled.TouchableOpacity`
  margin-bottom: 40px;
`;

export const Button = styled.TouchableOpacity`
  width: ${({ width }) => `${width}px`};
  height: ${({ height }) => `${height * 0.9}px`};
  background-color: ${({ color }) => color ?? "#101010"};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export const Filler = styled.View`
  flex: 1;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 10px 20px 20px 0;
`;

export const OperationText = styled.Text`
  color: #fafafa;
  font-size: 36px;
  font-family: Montserrat_600SemiBold;
`;

export const ButtonText = styled.Text`
  color: #fafafa;
  font-size: 32px;
  font-family: Montserrat_600SemiBold;
`;

export const ContentHolder = styled.View`
  margin-top: 10px;
  margin-left: 20px;
`;

export const BoldTextTitle = styled.Text`
  color: ${({ color }) => color ?? "#fafafa"};
  font-size: 20px;
  font-family: Montserrat_600SemiBold;
`;

export const TextTitle = styled.Text`
  color: #fafafa;
  font-size: 20px;
  font-family: Montserrat_400Regular;
`;

export const ValueLabel = styled.Text`
  color: #fafafa;
  font-size: 18px;
  font-family: Montserrat_400Regular;
`;

export const ValueText = styled.Text`
  color: #fafafa;
  font-size: 32px;
  font-family: Montserrat_600SemiBold;
  margin-top: 10px;
`;
