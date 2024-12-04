import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useRef } from 'react';
import { Button, Image, StyleSheet, Platform, Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import firebaseConfig, { db, storage } from './firebase';
import { addDoc, collection } from 'firebase/firestore';
import React from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});


async function sendPushNotification(expoPushToken: string, location: Location.LocationObject) {
  const projectId = Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
  const pushTokenString = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Berhasil',
    body: `${location.coords.longitude}, ${location.coords.latitude}`,
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}

export default function App() {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState(null);



  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(
    undefined
  );
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token ?? ''))
      .catch((error: any) => setExpoPushToken(`${error}`));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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

  const addData = async () => {
    if (!image) {
      console.log("No image to save!");
      return;
    } else if (!location) {
      console.log("No location data available to save!");
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "data"), {
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
        photo_url: image,
      });
      await sendPushNotification(expoPushToken, location);
      if (Platform.OS === "android") {
        console.log("Document written from phone with ID: ", docRef.id);
      } else {
        console.log("Document written with ID: ", docRef.id);
      }
    } catch (err) {
      console.error("Error occured ", err);
    }
  }

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

  return (
    <View style={styles.container}>
      <Text>Hans Philemon Limanza - 00000070710</Text>
      <Button title="Open Camera" onPress={requestCameraPermission} />
      <Button title="Open Gallery" onPress={openImagePicker} />
      <Button title="Create File" onPress={saveFile} />
      <Button title="Get Geo Location" onPress={getLocation} />
      <Button title="Add Data" onPress={async () => {
        await addData();
        await sendPushNotification(expoPushToken, location);
      }} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
      )}
      {location && (
        <View>
          <Text style={{ textAlign: 'center' }}>Longitude: {JSON.stringify(location.coords.longitude)}</Text>
          <Text style={{ textAlign: 'center' }}>Latitude: {JSON.stringify(location.coords.latitude)}</Text>
        </View>
      )}
      {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
        <Text>Your Expo push token: {expoPushToken}</Text>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text>Title: {notification && notification.request.content.title} </Text>
          <Text>Body: {notification && notification.request.content.body}</Text>
          <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
        </View>
        <Button
          title="Press to Send Notification"
          onPress={async () => {
            await sendPushNotification(expoPushToken, location);
          }}
        />
      </View> */}
    </View>
  ); ``
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
