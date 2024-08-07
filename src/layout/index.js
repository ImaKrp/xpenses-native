import React, { useEffect, useState, useRef, useCallback } from "react";
import { Wrapper } from "./styles";
import Header from "./Header";
import Nav from "./Nav";
import Constants from "expo-constants";
const { statusBarHeight } = Constants;

const Layout = ({ navigation, route, children, ...props }) => {
  const shouldShowNav = () => {
    return !(route?.name === "Calculator" || route?.name === "Form");
  };

  return (
    <>
      <Wrapper
        pt={route?.name !== "Form" ? statusBarHeight : 0}
        pd={route?.name !== "Form"}
      >
        {shouldShowNav() && <Header navigation={navigation} route={route} />}
        {children}
      </Wrapper>
      {shouldShowNav() && <Nav navigation={navigation} route={route} />}
    </>
  );
};

export default Layout;
