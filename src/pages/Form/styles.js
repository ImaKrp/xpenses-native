import styled from "styled-components/native";

export const Wrapper = styled.View`
  flex: 1;
  background-color: ${({ color }) => `${color}33`};
  padding-top: ${({ pt }) => `${pt + 4}px`};
`;

export const OutFormWrapper = styled.View`
  padding: 12px 24px;
  align-items: flex-start;
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

export const Justify = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: ${({ al }) => al ?? "center"};
  margin-bottom: ${({ mb }) => `${mb}px`};
`;

export const ViewButtons = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 24px;
`;

export const TextTitle = styled.Text`
  color: #e0e0e0;
  font-size: 16px;
  font-family: Montserrat_400Regular;
`;

export const TitleColumn = styled.View`
  padding: 0 20px;
  gap: 4px;
`;

export const ValueWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const ValueText = styled.Text`
  color: #fafafa;
  font-size: 20px;
  font-family: Montserrat_600SemiBold;
`;

export const ValueInput = styled.TextInput`
  color: #fafafa;
  font-size: 20px;
  font-family: Montserrat_600SemiBold;
  margin-right: 10px;
`;

export const FormWrapper = styled.View`
  background-color: #191919;
  flex: 1;
  padding: 18px;
  border-radius: 20px 20px 0 0;
`;

export const Label = styled.Text`
  color: #d0d0d0;
  border-radius: 20px;
  font-size: 16px;
  font-family: Montserrat_600SemiBold;
  margin-bottom: 6px;
  margin-top: 22px;
`;

export const DatePickerValue = styled.TouchableOpacity`
  border: 1px solid ${({ active }) => (active ? "#63616166" : "#636161")};
  padding: 6px 16px;
  align-items: center;
  flex-direction: row;
  color: #d0d0d0;
  border-radius: 20px;
  font-size: 16px;
  font-family: Montserrat_600SemiBold;
  gap: 8px;
  margin-left: ${({ ml }) => `${ml}px`};
  background-color: ${({ active }) => (active ? "#63616166" : "transparent")};
`;

export const DatePickerTextValue = styled.Text`
  color: #d0d0d0;
  font-size: 16px;
  font-family: Montserrat_600SemiBold;
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  padding: 10px 12px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: ${({ disabled }) => (disabled ? "#636161" : "#9474ee")};
  color: #d0d0d0;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  border-radius: 20px;
  font-size: 16px;
  margin-top: 54px;
  font-family: Montserrat_600SemiBold;
`;

export const SubmitText = styled.Text`
  color: #fafafa;
  font-size: 14px;
  font-family: Montserrat_600SemiBold;
`;
