import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';

const db = require('./assets/data.json');

export default function App() {
  const renderItem = ({ item }) => (
    <View style={styles.container}>
      <Image style={{
        width: 100,
        height: 100
      }} source={{ uri: item.photo_url }} />
      <Text>{item.name}</Text>
      <Text>{item.email}</Text>
      <View style={{
        width: "100%", backgroundColor: 'white', height:
          3,
      }} />
    </View>
  );
  return (
    <View style={styles.container}>
      <Image style={{
        width: 100,
        height: 100
      }} source={require('./assets/hans.jpg')} />
      <Text>Hans Philemon Limanza</Text>
      <Text>hans.philemon@student.umn.ac.id</Text>
      <FlatList
        data={db}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
