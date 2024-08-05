import styled from "styled-components/native";

export const Wrapper = styled.View`
  flex: 1;
  align-items: center;
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
  margin-top: 30px;
  font-family: Montserrat_600SemiBold;
`;

export const SubmitText = styled.Text`
  color: #fafafa;
  font-size: 14px;
  font-family: Montserrat_600SemiBold;
`;

export const Text = styled.Text`
  color: #d0d0d0;
  font-size: 20px;
  font-family: Montserrat_300Light;
  margin-top: ${({ mt }) => (mt ? `${mt}px` : 0)};
  margin-bottom: ${({ mb }) => (mb ? `${mb}px` : 0)};
`;

export const Bold = styled.Text`
  font-family: Montserrat_600SemiBold;
`;

export const ImageIcon = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 22px;
`;

export const TextIcon = styled.Text`
  color: #fafafa;
  font-size: 40px;
  font-family: Montserrat_600SemiBold;
`;

export const TextIconBackground = styled.View`
  background-color: #9474ee;
  width: 80px;
  height: 80px;
  align-items: center;
  justify-content: center;
  border-radius: 22px;
`;

export const RelativeView = styled.TouchableOpacity`
  margin-top: 10px;
  position: relative;
`;

export const SelectImage = styled.View`
  width: 26px;
  height: 26px;
  border-radius: 13px;
  background-color: #080808;
  position: absolute;
  bottom: -4px;
  right: -6px;
  align-items: center;
  justify-content: center;
`;
