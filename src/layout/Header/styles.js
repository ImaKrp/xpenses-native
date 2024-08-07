import styled from "styled-components/native";

export const Wrapper = styled.View`
  background-color: #191919;
  flex: 1;

  padding: ${({ pd }) => (pd ? "12px" : 0)};
  padding-top: ${({ pt }) => `${pt}px`};
`;

export const HeaderWrapper = styled.View`
  padding: 6px 12px 22px;
  flex-direction: row;
  align-items: center;
`;

export const Menu = styled.TouchableOpacity`
  margin-right: 20px;
`;

export const ImageIcon = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 6px;
`;

export const TextIcon = styled.Text`
  color: #fafafa;
  font-size: 24px;
  font-family: Montserrat_600SemiBold;
`;

export const TextIconBackground = styled.View`
  background-color: #9474ee;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
`;

export const HeaderColumn = styled.View`
  flex-direction: column;
  margin-left: 12px;
`;

export const HeaderSmallText = styled.Text`
  color: #fafafa;
  font-size: 12px;
  font-family: Montserrat_300Light;
`;

export const HeaderText = styled.Text`
  color: #fafafa;
  font-size: 18px;
  font-family: Montserrat_600SemiBold;
`;

export const NavWrapper = styled.View`
  background-color: #101010;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 10px 0 16px;
  gap: 40px;
`;

export const NewTransactionButton = styled.TouchableOpacity`
  padding: 8px;
  background-color: #9474ee;
  border-radius: 8px;
`;

export const Label = styled.Text`
  color: #d0d0d0;
  border-radius: 20px;
  font-size: 16px;
  font-family: Montserrat_400Regular;
  margin-bottom: 6px;
`;

export const Bold = styled.Text`
  font-family: Montserrat_600SemiBold;
`;

export const DrawerWrapper = styled.View`
  padding: 8px 16px;
  flex: 1;
  gap: 18px;
  flex-direction: ${({ row }) => (row ? "row" : "column")};
`;

export const ModalButtonWrapper = styled.TouchableOpacity`
  border: 2px solid ${({ color }) => color};
  padding: 8px 16px;
  border-radius: 26px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ModalButtonText = styled.Text`
  color: ${({ color }) => color};
  font-family: Montserrat_600SemiBold;
  font-size: 14px;
`;

export const DrawerBlock = styled.TouchableOpacity`
  width: ${({ w }) => `${w}px`};
  height: 120px;
  border: 1px solid #d0d0d0;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0;
  border-radius: 10px;
`;

export const DrawerBlockText = styled.Text`
  color: #d0d0d0;
  font-size: 14px;
  font-family: Montserrat_400Regular;
  margin-top: ${({ mt }) => (mt ? `${mt}px` : 0)};
`;
