import styled from "styled-components/native";

export const Wrapper = styled.View`
  padding: 12px;
  flex: 1;
  gap: 16px;
`;

export const SubmitButton = styled.TouchableOpacity`
  padding: 10px 12px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: ${({ gray }) => (gray ? "#636161aa" : "#9474ee")};
  color: #d0d0d0;
  opacity: 1;
  border-radius: 20px;
  font-size: 16px;
  font-family: Montserrat_600SemiBold;
  width: ${({ width }) => `${width}px`};
`;

export const Label = styled.Text`
  color: #d0d0d0;
  border-radius: 20px;
  font-size: 16px;
  font-family: Montserrat_600SemiBold;
  margin-bottom: 6px;
`;

export const SubmitText = styled.Text`
  color: #fafafa;
  font-size: 14px;
  font-family: Montserrat_600SemiBold;
`;
export const Row = styled.View`
  flex-direction: row;
  gap: 16px;
  flex-direction: row-reverse;
`;
