import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppLoading } from "expo";
import * as firebase from "firebase";
import axios from "axios";

//  Icons
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

//  Custom Components
import MainScreen from "./Screens/MainScreen";
import PostScreen from "./Screens/PostScreen";
import CreatePostScreen from "./Screens/CreatePostScreen";
import UserScreen from "./Screens/UserScreen";
import NotificationPostScreen from "./Screens/NotificationPostScreen";
import LikeScreen from "./Screens/LikeScreen";
import DeveloperScreen from "./Screens/DeveloperScreen";

//  Context
import { PostStateProvider } from "./Context";

//  Fonts
import * as Font from "expo-font";

//  Loading Fonts
const fetchFonts = () => {
  return Font.loadAsync({
    headerFont: require("./assets/Fonts/Trajan.ttf"),
    userNameFont: require("./assets/Fonts/LibreBaskerville.ttf"),
    bodyFont: require("./assets/Fonts/YanoneKaffeesatz.ttf"),
  });
};

// Firebase Setup
import firebaseConfig from "./config";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

//  Auth Stack
import Login from "./Screens/auth/Login";
import SignUp from "./Screens/auth/SignUp";
import ForgotPass from "./Screens/auth/ForgotPass";

// Stacks
const mainNav = createStackNavigator();
const createPostNav = createStackNavigator();
const userNav = createStackNavigator();
const tabNav = createBottomTabNavigator();
const authNav = createStackNavigator();

const mainScreenStack = () => {
  return (
    <mainNav.Navigator screenOptions={style} initialRouteName="Confessions">
      <mainNav.Screen name="Confessions" component={MainScreen} />
      <mainNav.Screen name="Post" component={PostScreen} />
      <mainNav.Screen name="Likes" component={LikeScreen} />
    </mainNav.Navigator>
  );
};

const createPostScreenStack = () => {
  return (
    <createPostNav.Navigator screenOptions={style}>
      <createPostNav.Screen name="Create Post" component={CreatePostScreen} />
    </createPostNav.Navigator>
  );
};

const userScreenStack = () => {
  return (
    <userNav.Navigator screenOptions={style}>
      <userNav.Screen name="Profile" component={UserScreen} />
      <userNav.Screen
        name="NotificationPost"
        options={{ title: "Post" }}
        component={NotificationPostScreen}
      />
      <userNav.Screen name="Developer" component={DeveloperScreen} />
    </userNav.Navigator>
  );
};

export default function App() {
  // States
  const [dataLoaded, setDataLoaded] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
      />
    );
  }

  if (initializing) return null;

  if (!user) {
    return (
      <NavigationContainer>
        <authNav.Navigator screenOptions={style}>
          <authNav.Screen name="Login" component={Login} />
          <authNav.Screen name="Sign Up" component={SignUp} />
          <authNav.Screen name="Recover" component={ForgotPass} />
        </authNav.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <PostStateProvider>
      <NavigationContainer initialRouteName="Feed">
        <tabNav.Navigator
          tabBarOptions={{ activeTintColor: "#d92027" }}
          initialRouteName="Feed"
        >
          <tabNav.Screen
            name="Feed"
            component={mainScreenStack}
            options={{
              tabBarIcon: ({ color }) => (
                <AntDesign name="home" size={24} color={color} />
              ),
            }}
          />
          <tabNav.Screen
            name="Create Post"
            component={createPostScreenStack}
            options={{
              unmountOnBlur: true,
              tabBarIcon: ({ color }) => (
                <Entypo name="new-message" size={22} color={color} />
              ),
            }}
          />

          <tabNav.Screen
            name="Profile"
            component={userScreenStack}
            options={{
              unmountOnBlur: true,
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons
                  name="face-profile"
                  size={24}
                  color={color}
                />
              ),
            }}
          />
        </tabNav.Navigator>
      </NavigationContainer>
    </PostStateProvider>
  );
}

const style = {
  headerTintColor: "#d92027",
  headerTitleAlign: "center",
  gestureEnabled: true,
  headerTitleStyle: {
    fontSize: 30,
    fontFamily: "headerFont",
  },
  headerStyle: {
    backgroundColor: "white",
  },
};
