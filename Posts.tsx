import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { getPosts } from './services/axios';
import { useEffect } from 'react';
import { Card } from 'react-native-paper';

const Posts = ({ navigation, route }) => {
  const [posts, setPosts] = useState<{ title: string; body: string; userId: number, id: number }[]>([]);
  const updatedPost = route.params?.updatedPost;

  useEffect(() => {
    if (updatedPost) {
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === updatedPost.id ? updatedPost  : post,
        )
      );
    }
  }, [updatedPost]);

  const getAllPosts = () => {
    getPosts()
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.log("Error fetching data: ", error);
      });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <ScrollView>
      {posts && posts.map((post, index) => (
        <Card
          key={index}
          style={{ marginVertical: 6, marginHorizontal: 12, paddingHorizontal: 8, paddingVertical: 16 }}
          onPress={() => navigation.navigate('Forms', { post })}
        >
          <Card.Title
            title={post.title}
            subtitle={post.body}
            subtitleNumberOfLines={3}
          >
          </Card.Title>
        </Card>
      ))}
    </ScrollView>
  )
}

export default Posts