import { StyleSheet, View, Image, ScrollView } from 'react-native';
import userData from "./data.json"
import styles from "./App.styles"
import { PaperProvider, useTheme, Avatar, Button, Card, Text } from 'react-native-paper';
import { red100 } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

export default function App() {
  const theme = useTheme();

  return (
    <PaperProvider>
      <ScrollView>
        {userData.map((users) => {
          return (
            <View style={styles.container} key={users.name}>
              <Card.Title
              style={red}
                title={users.name}
                subtitle={users.email}
                left={(props) => <Avatar.Image size={24} source={{ uri: users.photo_url }} />}
              />
              {/* <View style={styles.card}>
                <Image source={{ uri: users.photo_url }} style={styles.avatar} />
                <View style={styles.boldText}>
                  <Text style={styles.boldText}>{users.name}</Text>
                  <Text>{users.email}</Text>
                </View>
              </View> */}
            </View>
          )
        })}
      </ScrollView>
    </PaperProvider>
  );
}