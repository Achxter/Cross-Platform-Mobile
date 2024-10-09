import { Card, useTheme, Avatar } from "react-native-paper";
import React from "react";
import styles from "../App.styles";
import userData from "../data.json";
import { ScrollView, TouchableOpacity, View, Image, Text } from "react-native";
import Animated, { SlideInLeft, withDelay } from "react-native-reanimated";

const UserList = ({ navigation }) => {
  const theme = useTheme();
  const DELAY = 500;
  const [visible, setVisible] = React.useState(true);
  return (
    <ScrollView>
      {userData.map((users, index) => {
        return (
          <Animated.View entering={SlideInLeft.delay(DELAY * index)} key={index}>
            <Card style={styles.card} mode='elevated'>
              <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Profile", { user: users })}>
                <Card.Title
                  style={{ gap: 20, }}
                  title={users.name}
                  subtitle={users.email}
                  left={(props) => <Avatar.Image size={48} source={{ uri: users.photo_url }} />}
                />
              </TouchableOpacity>
            </Card>
          </Animated.View>
        );
      })}
    </ScrollView >
  );
};

export default UserList;
