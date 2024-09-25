import React from "react";
import styles from "../App.styles";
import { Text, View, Button } from "react-native";
import UserList from "./UserList";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Navigation List</Text>
      <Button title="Email" onPress={() => navigation.navigate("Email")} />
    </View>
  );
}

export default HomeScreen;
