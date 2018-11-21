/*
 * @file: SignIn.js
 * @description: Contains the SignIn Container.
 * @date: 9.Oct.2018
 * @author: Ravi Kumar
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
  ScrollView,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { removeListeners } from "../../utilities/listeners";
import { goHome } from "../../config/navigation";
import { Navigation } from "react-native-navigation";
const { height, width } = Dimensions.get("window");
import * as AppAction from "../../actions";
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
    // console.log(this.props, AppAction);
    removeListener = false;
    // this.props.dispatch(AppAction.login());
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
      <View style={styles.container}>
        <View style={{ flex: 0.35 }} />
        <View style={{ flex: 0.05 }}>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 8,
              fontSize: width * 0.045,
              fontWeight: "bold",
              color: "white"
            }}
          >
            Email :
          </Text>
        </View>

        <View
          style={{
            flex: 0.05,
            backgroundColor: "white",
            marginHorizontal: width * 0.03,
            borderRadius: width * 0.02
          }}
        >
          <TextInput
            style={{
              margin: 10,
              borderBottomColor: "#dadada",
              fontSize: width * 0.04
            }}
            value={this.state.email}
            onChangeText={email => {
              this.setState({ email });
            }}
            placeholder="email"
          />
        </View>
        <View style={{ flex: 0.05 }}>
          <Text
            style={{
              marginLeft: 10,
              marginTop: 8,
              fontSize: width * 0.045,
              fontWeight: "bold",
              color: "white"
            }}
          >
            Password :
          </Text>
        </View>
        <View
          style={{
            flex: 0.05,
            backgroundColor: "white",
            marginHorizontal: width * 0.03,
            borderRadius: width * 0.02
          }}
        >
          <TextInput
            secureTextEntry={true}
            style={{
              margin: 10,
              borderBottomColor: "#dadada",
              fontSize: width * 0.04
            }}
            value={this.state.password}
            onChangeText={password => {
              this.setState({ password });
            }}
            placeholder="password"
          />
        </View>
        <View style={{ flex: 0.2 }}>
          <View style={{ flex: 0.1 }} />
          <View
            style={{
              flex: 0.3,
              backgroundColor: "#0080ff",
              width: width * 0.5,
              justifyContent: "center",
              alignSelf: "center",
              borderRadius: width * 0.02
            }}
          >
            <TouchableOpacity
              style={{ margin: 10, alignItems: "center" }}
              onPress={this.signIn}
            >
              <Text
                style={{
                  fontSize: width * 0.045,
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "white"
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 0.1 }} />
          <View
            style={{
              flex: 0.3,
              backgroundColor: "#0080ff",
              width: width * 0.5,
              justifyContent: "center",
              alignSelf: "center",
              borderRadius: width * 0.02
            }}
          >
            <TouchableOpacity
              style={{ margin: 10, alignItems: "center" }}
              onPress={() => this.signUp()}
            >
              <Text
                style={{
                  fontSize: width * 0.045,
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "white"
                }}
              >
                SignUp
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 0.2 }} />
      </View>
      // <ScrollView contentContainerStyle={styles.container}>
      //   <TextInput
      //     style={styles.input}
      //     placeholder="Username"
      //     autoCapitalize="none"
      //     autoCorrect={false}
      //     placeholderTextColor="white"
      //     onChangeText={val => this.onChangeText("username", val)}
      //   />
      //   <TextInput
      //     style={styles.input}
      //     placeholder="Password"
      //     autoCapitalize="none"
      //     secureTextEntry={true}
      //     placeholderTextColor="white"
      //     onChangeText={val => this.onChangeText("password", val)}
      //   />
      //   <Button title="Sign In" onPress={this.signIn} />
      //   <Button title="Sign Up" onPress={() => this.signUp()} />
      // </ScrollView>
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
    backgroundColor: "#bfb6ad"
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
