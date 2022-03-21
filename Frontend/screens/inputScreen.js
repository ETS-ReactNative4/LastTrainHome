import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { StyleSheet, Text, View, ImageBackground, Button, TextInput } from 'react-native';

export default function InputScreen({ navigation }) {
  const [curLoc, setCurLoc] = useState(null); //initial
  const [desLoc, setDesLoc] = useState(null); //initial

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [curaddress, setcuraddress] = useState(null);

  const [text, setText] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let curaddress = await Location.reverseGeocodeAsync(location.coords);
      setLocation(location);
      setcuraddress(curaddress);
    })();
  }, []);

  let loctext = 'Waiting..';
  if (errorMsg) {
    loctext = errorMsg;
  } else if (location) {
    loctext = JSON.stringify(location["coords"]["latitude"])+" "+JSON.stringify(location["coords"]["longitude"]);
    
  }
  let curaddresstext = 'waiting..'
  if (curaddress !== null){
    curaddresstext = curaddress[0]["name"]+" "+curaddress[0]["street"];
  }

  let passData = {curLoc,desLoc}

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
            value = {text}
            onChangeText={(val) => {setCurLoc(val); setText(val)}}
          />
          <Button style={styles.inputButton} title="Set Current Location" onPress={() => {setCurLoc(curaddresstext); setText(curaddresstext);}}/>
          <Text style={styles.inputText}>Input your Destination</Text>
          <TextInput placeholderTextColor="#afafaf" 
            style={styles.input}
            placeholder='Destination'
            onChangeText={(val) => setDesLoc(val)}
          />

        </View>

        <View style={styles.buttonSpace}>
          <Button style={styles.inputButton}
           title="Search" disabled={!curLoc||!desLoc} onPress={() => {navigation.navigate('Home',passData)}} />
        </View>
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

  buttonSpace: {
    marginTop: '20%',
    width: '100%',
    alignItems: 'center',
  },

  inputButton: {
    width: '100px',
    height: '30px',
  }
});