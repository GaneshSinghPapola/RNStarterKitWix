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
  Platform,
  TouchableOpacity
} from "react-native";
import { removeListeners } from "../../utilities/listeners";
import { goHome } from "../../config/navigation";
import { Navigation } from "react-native-navigation";
const { height, width } = Dimensions.get("window");
import * as AppAction from "../../actions";

import BackgroundFetch from "react-native-background-fetch";

import MapView, { Marker, AnimatedRegion, Polyline } from "react-native-maps";
import haversine from "haversine";

const LATITUDE = 29.95539;
const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;

let removeListener = true;

class SignIn extends React.Component {
  static options(passProps) {
    return {};
  }
  constructor(props) {
    super(props);

    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE
      })
    };
  }

  async componentWillMount() {
    await fetch(this.slack(`componentWillMount ${new Date()}`),{method:'POST'})
    navigator.geolocation.getCurrentPosition(
      position => {console.log("my current position is >> ",position)},
      error => alert(error.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  }

  componentDidMount() {
    console.log("DidMount>")
    this.configureBackgroundFetch()
    const { coordinate } = this.state;
    this.watchID = navigator.geolocation.watchPosition(
      async position => {
        console.log("watch position >>>> ",position)
        const { coordinate, routeCoordinates, distanceTravelled } = this.state;
        const { latitude, longitude } = position.coords;
        await fetch(this.slack(`location changed onwatch ${new Date()} ${latitude}-${longitude}`),{method:'POST'})
        const newCoordinate = {
          latitude,
          longitude
        };

        if (Platform.OS === "android") {
          if (this.marker) {
            this.marker._component.animateMarkerToCoordinate(
              newCoordinate,
              500
            );
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }

        this.setState({
          latitude,
          longitude,
          routeCoordinates: routeCoordinates.concat([newCoordinate]),
          distanceTravelled:
            distanceTravelled + this.calcDistance(newCoordinate),
          prevLatLng: newCoordinate
        });
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    
  }
  slack(message="Testing"){
    return `https://slack.com/api/chat.postMessage?token=xoxp-488765608567-487788351474-507671422259-a26b639d2c3b55d35abbca379f98da87&channel=mobileapp&text=${message}&pretty=1` //mopbileapp
    // return `https://slack.com/api/chat.postMessage?token=xoxp-507675683459-507686602803-507189510593-fdcf0eb87914605511d1be417b38cf21&channel=general&text=${message}&pretty=1`
  }
  async configureBackgroundFetch(){
    console.log("config called")
    await fetch(this.slack(`configuring background fetch ${new Date()}`),{method:'POST'})
    BackgroundFetch.configure({
      minimumFetchInterval: 15,
      stopOnTerminate: false, 
      startOnBoot: true   
    }, async() => {
      console.log("[js] Received background-fetch event");
      await  fetch(this.slack(`Received background-fetch event ${new Date()}`),{method:'POST'})
      navigator.geolocation.getCurrentPosition(
        async position => {
          const { coordinate, routeCoordinates, distanceTravelled } = this.state;
          const { latitude, longitude } = position.coords;
          await  fetch(this.slack(`Current location on background fetch ${new Date()} ${latitude}-${longitude}`),{method:'POST'});
          const newCoordinate = {
            latitude,
            longitude
          };
  
          if (Platform.OS === "android") {
            if (this.marker) {
              this.marker._component.animateMarkerToCoordinate(
                newCoordinate,
                500
              );
            }
          } else {
            coordinate.timing(newCoordinate).start();
          }
  
          this.setState({
            latitude,
            longitude,
            routeCoordinates: routeCoordinates.concat([newCoordinate]),
            distanceTravelled:
              distanceTravelled + this.calcDistance(newCoordinate),
            prevLatLng: newCoordinate
          });
        },
        error => alert(error.message),
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000
        }
      );
      BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA);
    }, (error) => {
      console.log("[js] RNBackgroundFetch failed to start");
    });

    BackgroundFetch.status((status) => {
      switch(status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          console.log("BackgroundFetch restricted");
          break;
        case BackgroundFetch.STATUS_DENIED:
          console.log("BackgroundFetch denied");
          break;
        case BackgroundFetch.STATUS_AVAILABLE:
          console.log("BackgroundFetch is enabled");
          break;
      }
    });

    BackgroundFetch.start(async ()=>{
      console.log('[js] RNBackgroundFetch!');
        await fetch(this.slack(`background fetch event on start function called ${new Date()}`),{method:'POST'})
      
    }, function(e){
      let error = 'Error!' + e;
    console.log(error);
    });


  }
  


  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          showUserLocation
          followUserLocation
          loadingEnabled
          region={this.getMapRegion()}
        >
          <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
          <Marker.Animated 
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate} />
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.bubble, styles.button]}>
            <Text style={styles.bottomBarContent}>
              {parseFloat(this.state.distanceTravelled).toFixed(2)} km
            </Text>
          </TouchableOpacity>
        </View>
      </View>
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
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
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