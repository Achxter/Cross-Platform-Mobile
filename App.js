import React from "react";
import { StyleSheet, View, Image, ScrollView } from "react-native";
import userData from "./data.json";
import styles from "./App.styles";
import {
  NavigationContainer,
  NavigationContainerRefContext,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Email from "./pages/Email";
import HomeScreen from "./pages/HomeScreen";
import UserList from "./pages/UserList";
import Profile from "./pages/Profile";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <PaperProvider>
          <Stack.Navigator>
            <Stack.Screen name="UserList" component={UserList} />
            <Stack.Screen name="Profile" component={Profile} />
          </Stack.Navigator>
        </PaperProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
