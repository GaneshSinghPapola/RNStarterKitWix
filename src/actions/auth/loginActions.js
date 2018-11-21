import { SERVER_URL } from "../../constants/url";
import * as types from "../../actionTypes";
import { Alert } from "react-native";
import { goHome } from "../../config/navigation";

// export const login = data => {
//   console.log("data ===>", `${SERVER_URL}users/authenticate`, data);
//   return (dispatch, getState) => {
//     dispatch({ type: types.LOGIN_REQUEST });
//     fetch(`${SERVER_URL}users/authenticate`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(data)
//     })
//       .then(res => {
//         return res.json();
//       })
//       .then(response => {
//         if (response.message) {
//           Alert.alert("Login", response.message);
//           dispatch({ type: types.LOGIN_FAIL });
//         } else {
//           dispatch({ type: types.LOGIN_SUCCESS, payload: response });
//           goHome();
//         }

//         console.log("login response ==>", response);
//       })
//       .catch(err => {
//         Alert.alert("Error", "Something went wrong. Please try again later.");
//         dispatch({ type: types.LOGIN_FAIL });
//         console.log("Error ==>", err);
//       });
//   };
// };

export const logout = data => {
  console.log("tester 1234+++++");
  return (dispatch, getState) => {
    dispatch({ type: "LOGOUT" });
  };
};
