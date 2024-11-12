import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Image, PermissionsAndroid, StyleSheet, Text, View, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  const [image, setImage] = useState(null);

  const openImagePicker = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      handleResponse(result);
    } catch (error) {
      console.log("Error opening image picker: ", error);
    }
  };

  const handleCameraLaunch = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      handleResponse(result);
    } catch (error) {
      console.log("Error launching camera: ", error);
    }
  };

  const requestCameraPermission = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status === "granted") {
        console.log("Camera permission granted");
        handleCameraLaunch();
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn("Error requesting camera permission: ", err);
    }
  };

  const handleResponse = (response) => {
    if (response.canceled) {
      console.log("User cancelled image picker");
    } else {
      const imageUri = response.assets[0].uri;
      console.log("Selected image URI: ", imageUri);
      setImage(imageUri);
    }
  };

  const saveFile = async () => {
    try {
      if (!image) {
        console.log("No image to save!");
        return;
      }

      if (Platform.OS === "android") {
        const { status } = await MediaLibrary.requestPermissionsAsync();

        if (status !== 'granted') {
          console.log("Storage permission denied");
          return;
        }
      }

      const currentTime = new Date();
      const formattedTime = `${currentTime.getDate()}${currentTime.getMonth() + 1}${currentTime.getFullYear()}_${currentTime.getHours()}${currentTime.getMinutes()}${currentTime.getSeconds()}`;
      const destinationPath = `${FileSystem.documentDirectory}Pictures/image_${formattedTime}.jpg`;

      const picturesDir = `${FileSystem.documentDirectory}Pictures/`;
      const dirExists = await FileSystem.getInfoAsync(picturesDir);

      if (!dirExists.exists) {
        await FileSystem.makeDirectoryAsync(picturesDir, { intermediates: true });
        console.log("Created Pictures directory");
      }

      // Copy the file
      await FileSystem.copyAsync({
        from: image,
        to: destinationPath,
      });

      console.log("Image saved successfully to:", destinationPath);
    } catch (err) {
      console.error("Error saving file:", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Hans Philemon Limanza - 00000070710</Text>
      <Button title="Open Camera" onPress={requestCameraPermission} />
      <Button title="Open Gallery" onPress={openImagePicker} />
      <Button title="Create File" onPress={saveFile} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
      )}
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
