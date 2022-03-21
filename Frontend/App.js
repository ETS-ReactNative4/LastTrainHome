import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import Navigator from './routes/homeStack';

export default function App({ navigation }) {
  return (
    <Navigator />
  );
};
