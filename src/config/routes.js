/*
 * @file: routes.js
 * @description: Contains all routes registered.
 * @date: 9.Oct.2018
 * @author: Parshant Nagpal
 * */
import { Navigation } from "react-native-navigation";

export const registerScreens = (store, Provider) => {
  // Loader Stack
  Navigation.registerComponentWithRedux(
    "Loader",
    () => require("../container/Loader").default,
    Provider,
    store
  );
  // Auth stack
  Navigation.registerComponentWithRedux(
    "SignIn",
    () => require("../container/SignIn").default,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    "SignUp",
    () => require("../container/SignUp").default,
    Provider,
    store
  );
  // Dashboard Stack
  Navigation.registerComponentWithRedux(
    "Home",
    () => require("../container/Home").default,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    "Tab2",
    () => require("../container/Tab2").default,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    "Screen2",
    () => require("../container/Screen2").default,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    "Screen3",
    () => require("../container/Screen3").default,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    "Screen4",
    () => require("../container/Screen4").default,
    Provider,
    store
  );

  Navigation.registerComponentWithRedux(
    "SideMenu",
    () => require("../container/SideMenu").default,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    "NavBar",
    () => require("../components/navBar").default,
    Provider,
    store
  );
};
