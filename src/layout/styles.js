import styled from "styled-components/native";

export const Wrapper = styled.View`
  background-color: #191919;
  flex: 1;

  padding: ${({ pd }) => (pd ? "12px" : 0)};
  padding-top: ${({ pt }) => `${pt}px`};
`;
