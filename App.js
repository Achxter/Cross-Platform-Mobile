import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Image, PermissionsAndroid, StyleSheet, Text, View, Platform } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';

export default function App() {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

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
      const destinationPathImage = `${FileSystem.documentDirectory}Pictures/image_${formattedTime}.jpg`;
      const destinationPathLocation = `${FileSystem.documentDirectory}Pictures/image_${formattedTime}.txt`;

      const picturesDir = `${FileSystem.documentDirectory}Pictures/`;
      const dirExists = await FileSystem.getInfoAsync(picturesDir);

      if (!dirExists.exists) {
        await FileSystem.makeDirectoryAsync(picturesDir, { intermediates: true });
        console.log("Created Pictures directory");
      }
      if (location) {
        const locationData = `Longitude: ${location.coords.longitude}, Latitude: ${location.coords.latitude}`;
        await FileSystem.writeAsStringAsync(destinationPathLocation, locationData);
        console.log("Location saved successfully to:", destinationPathLocation);
      } else {
        console.log("No location data available to save!");
      }
      // Copy the file
      await FileSystem.copyAsync({
        from: image,
        to: destinationPathImage,
      });

      console.log("Image saved successfully to:", destinationPathImage);
    } catch (err) {
      console.error("Error saving file:", err);
    }
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location)
    setLocation(location);
  }

  const hasLocationPermission = async () => {
    if (Platform.OS === "android" && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      console.log("Location permission denied by user.");
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      console.log("Location permission revoked by user.");
    }

    return false;
  }

  return (
    <View style={styles.container}>
      <Text>Hans Philemon Limanza - 00000070710</Text>
      <Button title="Open Camera" onPress={requestCameraPermission} />
      <Button title="Open Gallery" onPress={openImagePicker} />
      <Button title="Create File" onPress={saveFile} />
      <Button title="Get Geo Location" onPress={getLocation} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
      )}
      {location && (
        <View>
          <Text style={{ textAlign: 'center' }}>Longitude: {JSON.stringify(location.coords.longitude)}</Text>
          <Text style={{ textAlign: 'center' }}>Latitude: {JSON.stringify(location.coords.latitude)}</Text>
        </View>
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
