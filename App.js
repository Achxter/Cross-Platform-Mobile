import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import userData from "./data.json"
import styles from "./App.styles"
import { Provider as PaperProvider, useTheme, Avatar, Button, Card, Text, Badge, Banner, IconButton } from 'react-native-paper';

export default function App() {
  const theme = useTheme();
  const [visible, setVisible] = React.useState(true);

  return (
    <PaperProvider>
      <ScrollView>
        {userData.map((users) => {
          return (
            <Card style={styles.card} key={users.name} mode='elevated'>
              <Card.Title
                style={{ gap: 20, }}
                title={users.name}
                subtitle={users.email}
                left={(props) => <Avatar.Image size={48} source={{ uri: users.photo_url }} />}
              />
            </Card>
          )
        })}
      </ScrollView>
    </PaperProvider>
  );
}