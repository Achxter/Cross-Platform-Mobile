import React from "react";
import { View, Text, Button, Image } from "react-native";
import Avatar from "react-native-paper";

const Profile = ({ navigation, route }) => {
  const { user } = route.params;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image style={{height: 100, width: 100, borderRadius: 50,}} source={{ uri: user.photo_url }} />
      <Text>{user.name}&apos;s Profile</Text>
      <Text>{user.email}</Text>
      <Button
        title="Go Back"
        onPress={() => navigation.navigate("UserList")}
      ></Button>
    </View>
  );
};
export default Profile;
