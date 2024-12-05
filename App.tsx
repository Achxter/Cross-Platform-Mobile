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
import { Provider } from 'react-redux';
import { store } from './store';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { incrementFailed, incrementSuccess } from './slice/counterSlice';
import StoreSimulator from './storeSimulator';

export default function App() {
  return (
    <Provider store={store}>
      <StoreSimulator />
    </Provider>
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
