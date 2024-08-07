import styled from "styled-components/native";

export const Wrapper = styled.View`
  height: 42px;
  border-radius: 21px;
  background-color: #2e2e2e;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 6px;
  margin: ${({ margin }) => (margin ? "0 12px" : 0)};
`;
export const Filler = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  gap: 20px;
`;

export const PressableTexts = styled.Text`
  font-family: ${({ active }) =>
    active ? "Montserrat_600SemiBold" : "Montserrat_400Regular"};
  font-size: ${({ active }) => (active ? 16 : 14)}px;
  width: ${({ active }) => (active ? 95 : 85)}px;
  text-align: center;
  color: #fafafa;
`;
