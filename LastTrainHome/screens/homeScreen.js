import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, ImageBackground, Button, TextInput, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [curLoc, setCurLoc] = useState('test'); //initial
  const [desLoc, setDesLoc] = useState('test'); //initial

  return (
    <View style={styles.container}>

      <View style={styles.homeContainer}>
        <ImageBackground
        source={require('../assets/images/train.jpg')}
        style={styles.homeImage}/>

        <View style={styles.titles}>
          <Text style={styles.title}>Last Train Home</Text>
          <Text style={styles.subtitle}>Catch your last train back home!</Text>
        </View>

        <View style={styles.inputSpace}>
          <Text style={styles.inputText}>Input your Starting Location</Text>
          <TextInput placeholderTextColor="#afafaf" 
            style={styles.input}
            placeholder='Starting Location'
            onChangeText={(val) => setCurLoc(val)}
          />
          <Text style={styles.inputText}>Input your Destination</Text>
          <TextInput placeholderTextColor="#afafaf" 
            style={styles.input}
            placeholder='Destination'
            onChangeText={(val) => setDesLoc(val)}
          />
          <Text style={styles.inputText}>1: {curLoc}, 2:{desLoc}</Text>
        </View>

        <Button style={styles.inputButton}
         title="Search" onPress={() => {navigation.navigate('Mapview')}} />

      </View>
      <StatusBar style="auto" />
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

  homeContainer: {
    width: '100%',
    height: '100%',
  },

  titles: {
    marginTop: '20%',
    width: '100%',
    alignItems: 'center',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },

  subtitle: {
    fontSize: 15,
    color: '#bfbfbf',
  },

  homeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },

  inputSpace: {
    marginTop: '20%',
    width: '100%',
    alignItems: 'center',
  },

  inputText: {
    fontSize: 15,
    color: 'white',
  },

  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 400,
    color: 'white',
  },

  inputButton: {
    width: '100px',
    height: '30px',
  }
});