import { Card, useTheme, Avatar } from "react-native-paper";
import React from "react";
import styles from "../App.styles";
import userData from "../data.json";
import { ScrollView, TouchableOpacity, View, Image, Text } from "react-native";

const UserList = ({ navigation }) => {
  const theme = useTheme();
  const [visible, setVisible] = React.useState(true);
  return (
    <ScrollView>
      {userData.map((users) => {
        return (
          <Card style={styles.card} key={users.name} mode='elevated'>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Profile", { user: users })}>
              <Card.Title
                style={{ gap: 20, }}
                title={users.name}
                subtitle={users.email}
                left={(props) => <Avatar.Image size={48} source={{ uri: users.photo_url }} />}
              />
              {/* <Image style={styles.avatar} source={{ uri: users.photo_url, }} />
              <View>
                <Text style={styles.boldText}>{users.name}</Text>
                <Text>{users.email}</Text>
              </View> */}
            </TouchableOpacity>
          </Card>
        );
      })}
    </ScrollView >
  );
};

export default UserList;
