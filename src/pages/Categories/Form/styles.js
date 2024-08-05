import styled from "styled-components/native";

export const Wrapper = styled.View`
  padding: 12px;
  flex: 1;
  gap: 16px;
`;

export const Label = styled.Text`
  color: #d0d0d0;
  border-radius: 20px;
  font-size: 16px;
  font-family: Montserrat_600SemiBold;
  margin-bottom: 6px;
`;

export const ScrollView = styled.ScrollView``;

export const ColorSelected = styled.View`
  background-color: ${({ color }) => color};
  margin-left: ${({ ml }) => `${ml}px`};
  width: 36px;
  height: 36px;
  border-radius: 18px;
  align-items: center;
  justify-content: center;
`;

export const Color = styled.TouchableOpacity`
  background-color: ${({ color }) => color};
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 3px solid #191919;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: ${({ width }) => `${width}px`};
`;

export const IconSelected = styled.View`
  background-color: ${({ selected, color }) => (selected ? color : "#191919")};
  margin-left: ${({ ml }) => `${ml}px`};
  width: 52px;
  height: 52px;
  border-radius: 26px;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled.TouchableOpacity`
  background-color: ${({ selected, color }) => (selected ? color : "#636161")};
  width: 48px;
  height: 48px;
  border-radius: 24px;
  border: 3px solid #191919;
  align-items: center;
  justify-content: center;
`;

export const SubmitButton = styled.TouchableOpacity`
  padding: 10px 12px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: ${({ disabled }) => (disabled ? "#636161" : "#9474ee")};
  color: #d0d0d0;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  border-radius: 20px;
  font-size: 16px;
  font-family: Montserrat_600SemiBold;
`;

export const SubmitText = styled.Text`
  color: #fafafa;
  font-size: 14px;
  font-family: Montserrat_600SemiBold;
`;
