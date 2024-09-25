import React from "react";
import { Button, Text, View } from "react-native";

const Email = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Email List Page</Text>
      <Button
        title="Go Home"
        onPress={() => navigation.navigate("Home")}
      ></Button>
    </View>
  );
};

export default Email;
