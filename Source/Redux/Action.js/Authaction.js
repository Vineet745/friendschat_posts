import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_FAIL,
  EXISTINGUSER_SUCCESS,
} from '../Constant';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

// REGISTER USER

//
export const Register = (name, email, password) => async dispatch => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(
      email,
      password,
    );
    const {user} = userCredential;

    // Use the 'add' method to create a new document in the 'users' collection
    const userDocRef = await firestore().collection('users').doc(user.uid).set({
      name: name,
      email: email,
      password: password,
      uid: user.uid, // Use 'user.uid' instead of 'userCredential.uid'

    })
        dispatch({
          type: REGISTER_SUCCESS,
          payload: user,
  });
    
  } catch (error) {
    console.log(error);
    dispatch({type: REGISTER_FAIL, payload: error});
  }
};

// Login User

const loginRequest = () => {
  return {
    type: LOGIN_REQUEST,
  };
};

const loginSuccess = data => {
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  };
};

const loginError = err => {
  return {
    type: LOGIN_FAIL,
    payload: err,
  };
};

export const loginuser = (email, password) => async dispatch => {
  try {
    dispatch(loginRequest());
    const {user} = await auth().signInWithEmailAndPassword(email, password);
    dispatch(loginSuccess(user));
    return user;
  } catch (error) {
    console.log(error);
    dispatch(loginError(error));
  }
};

// existing User

export const setUser = user => ({
  type: EXISTINGUSER_SUCCESS,
  payload: user,
  
});



// Logout User

export const logoutuser = user =>({
  type:LOGOUT,
  payload:user,
})