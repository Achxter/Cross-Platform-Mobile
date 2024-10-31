import { View, Text } from 'react-native'
import { postData } from './services/axios';
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-native-paper';

const Forms = ({ navigation, route }) => {
  const [post, setPost] = useState(route.params.post);
  const data = {
    title: "Title",
    body: "Body",
    userId: 1,
    id: post.id,
  };

  const handlePostData = () => {
    postData(data)
      .then((res) => {
        if (res.status === 200) {
          setPost(data);
          setTimeout(() => {
            navigation.navigate('Posts', { updatedPost: data });
          }, 1000);
        }
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  return (
    <View>
      <Card style={{ paddingHorizontal: 16, paddingVertical: 8, marginHorizontal: 16, marginVertical: 8 }}>
        <Text>{post.title}</Text>
      </Card>
      <Card style={{ paddingHorizontal: 16, paddingVertical: 8, marginHorizontal: 16, marginVertical: 8 }}>
        <Text>{post.body}</Text>
      </Card>
      <Button style={{ marginVertical: 8, marginHorizontal: 16 }} mode='contained' onPress={handlePostData}>
        Update Post
      </Button>
      <Button style={{ marginVertical: 8, marginHorizontal: 16 }} mode='contained' onPress={() => navigation.goBack()}>
        Go back
      </Button>
    </View>
  )
}

export default Forms