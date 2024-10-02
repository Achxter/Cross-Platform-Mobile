import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Input } from './Components/Input';
import React, { useState } from 'react';


export default function App() {
  const [name, setName] = useState("");
  const [nim, setNim] = useState("")
  const handleChangeMyName = (value) => {
    setName(value)
  };
  const handleChangeMyNim = (value) => {
    setNim(value)
  };

  return (
    <View style={styles.container}>
      <Text>{name} - {nim}</Text>
      <Input text="Name" keyboardType='text' onChangeText={handleChangeMyName} />
      <Input text="NIM" keyboardType='numeric' onChangeText={handleChangeMyNim} />
    </View>
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
