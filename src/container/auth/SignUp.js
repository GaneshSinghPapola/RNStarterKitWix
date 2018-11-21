/*
 * @file: SignUp.js
 * @description: Contains the SignUp Container.
 * @date: 9.Oct.2018
 * @author: Ravi Kumar
 * */

import React, { Fragment } from "react";
import { View, Button, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import {signup} from '../../actions'

const imageOption = {
  title: 'Select Avatar',
  customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
 class SignUp extends React.Component {
  state = {
    username: "",
    password: "",
    email: "",
    phone_number: "",
    file:{}
  };
  onChangeText = (key, val) => {
    this.setState({ [key]: val });
  };
  signUp = async () => {
    const { username, password, email, phone_number, file } = this.state;
    this.props.register({ username, password, email, phone_number, file })
  };

  showImagePicker(imageOptions) {

    ImagePicker.showImagePicker(imageOptions, response => {
     console.log("image options >>> ",response)
      if (response.uri) {
          this.setState({ file: { uri: response.uri, name:response.fileName, type:'image/jpg' } });        
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={val => this.onChangeText("username", val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={val => this.onChangeText("password", val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={val => this.onChangeText("email", val)}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={val => this.onChangeText("phone_number", val)}
        />

        <TouchableOpacity
                      onPress={() => {
                        this.showImagePicker( { ...imageOption, title: "Select Document" });
                      }}>
                      <Text>File</Text>
        </TouchableOpacity>              

        <Button title="Sign Up" onPress={this.signUp} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: "#42A5F5",
    margin: 10,
    padding: 8,
    color: "white",
    borderRadius: 14
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});


const mapStateToProps = ({ }) => {  
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    register: user => dispatch(signup(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);