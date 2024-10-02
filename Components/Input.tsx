import React, { useState } from "react";
import { TextInput, View, Text } from "react-native";

const Input = ({ text, onChangeText, keyboardType }) => {
  return (
    <View>
      <Text>{text}</Text>
      <TextInput
        placeholder={"Input your " + text}
        style={{
          borderColor: 'black',
          borderWidth: 1,
          padding: 10,
          borderRadius: 8
        }}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
      />
    </View>
  );
};
export { Input };