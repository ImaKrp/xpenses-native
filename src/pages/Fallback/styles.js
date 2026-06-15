import styled from "styled-components/native";

export const Wrapper = styled.View`
  flex: 1;
  background-color: #191919;
  align-items: center;
  justify-content: center;
  padding: 32px;
`;

export const IconWrapper = styled.View`
  width: 90px;
  height: 90px;
  border-radius: 24px;
  background-color: #9474ee;
  align-items: center;
  justify-content: center;
  margin-bottom: 28px;
`;

export const Title = styled.Text`
  color: #fafafa;
  font-size: 22px;
  font-family: Montserrat_600SemiBold;
  text-align: center;
  margin-bottom: 14px;
`;

export const Message = styled.Text`
  color: #d0d0d0;
  font-size: 16px;
  font-family: Montserrat_300Light;
  text-align: center;
  line-height: 24px;
`;
