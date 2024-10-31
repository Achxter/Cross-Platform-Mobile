import { NavigationContainer } from '@react-navigation/native';
import { getPosts, postData } from './services/axios';
import { createStackNavigator } from '@react-navigation/stack';
import Posts from './Posts';
import Forms from './Forms';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  const Stack = createStackNavigator();
  // const [posts, setPosts] = useState([])

  // const data = {
  //   title: "Title",
  //   body: "Body",
  //   userId: 1,
  // };

  // const handlePostData = () => {
  //   postData(data).then((res) => {
  //     console.log(res);
  //   });
  // }

  // const getAllPosts = () => {
  //   getPosts()
  //     .then(response => {
  //       setPosts(response.data);
  //     })
  //     .catch(error => {
  //       console.log("Error fetching data: ", error);
  //     });
  // };

  // useEffect(() => {
  //   getAllPosts();
  // }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Posts" component={Posts} />
            <Stack.Screen name="Forms" component={Forms} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
