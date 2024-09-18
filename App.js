import { StatusBar } from 'expo-status-bar';
import Counter from "./component/Counter";
import Profile from './component/Profile';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useState } from 'react';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export default function App() {
  const [text, setText] = useState("Input your name here")
  const [count, setCount] = useState(0);
  const [nama, setNama] = useState("Anonymous");
  const [umur, setUmur] = useState(0)

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleValue = () => {
    setNama(text)
    setUmur(count)
  }


  return (
    <View style={styles.container}>
      <Profile
        nama={nama}
        styles={styles.text}
        umur={umur} />
      <Counter
        value={count}
        handleDecrement={handleDecrement}
        handleIncrement={handleIncrement}
        handleValue={handleValue}
      />
      <TextInput id='nama' value={text} style={styles.form} onChangeText={setText}></TextInput>
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
  text: {
    width: 200,
    textAlign: 'left',
  },
  form: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    margin: 10,
    width: 200
  }
});
