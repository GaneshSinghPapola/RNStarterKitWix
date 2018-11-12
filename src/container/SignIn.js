/*
 * @file: SignIn.js
 * @description: Contains the SignIn Container.
 * @date: 9.Oct.2018
 * @author: Parshant Nagpal
 * */
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  AsyncStorage,
  ScrollView
} from "react-native";
import { removeListeners } from "../utilities/listeners";
import { goHome } from "../config/navigation";
import { Navigation } from "react-native-navigation";

import * as AppAction from "../actions";
let removeListener = true;

class SignIn extends React.Component {
  static options(passProps) {
    return {};
  }
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.signUp = this.signUp.bind(this);
  }

  componentWillUnmount() {
    if (removeListener) {
      removeListeners();
    }
  }
  onChangeText = (key, value) => {
    this.setState({ [key]: value });
  };
  signIn = () => {
    const { username, password } = this.state;
    console.log(this.props, AppAction);
    removeListener = false;
    this.props.dispatch(AppAction.login());
    goHome();
  };
  signUp() {
    this.props.dispatch(
      AppAction.pushTParticulatScreen(this.props.componentId, "SignUp")
    );
  }
  render() {
    console.log(Navigation, "this.props.componentIdthis.props.componentId");
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="green"
          onChangeText={val => this.onChangeText("username", val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          autoCapitalize="none"
          secureTextEntry={true}
          placeholderTextColor="white"
          onChangeText={val => this.onChangeText("password", val)}
        />
        <Button title="Sign In" onPress={this.signIn} />
        <Button title="Sign Up" onPress={() => this.signUp()} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    fontSize: 18,
    fontWeight: "500",
    height: 55,
    backgroundColor: "#42A5F5",
    margin: 10,
    color: "white",
    padding: 8,
    borderRadius: 14
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
const mapStateToProps = state => ({
  user: state.user,
  app: state.app
});
const mapDispatchToProps = dispatch => ({
  appAction: bindActionCreators(AppAction, dispatch)
});

export default connect(
  mapStateToProps,
  null
)(SignIn);
