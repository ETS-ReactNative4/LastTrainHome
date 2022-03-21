import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import * as Location from 'expo-location';
import { StyleSheet, Text, View, ImageBackground, Button, TextInput } from 'react-native';

export default function HomeScreen({ navigation, route }) {
  const passData = route.params;
  const curLoc = passData.curLoc;
  const desLoc = passData.desLoc;

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [curcoord, setcurcoord] = useState(null);
  const [descoord, setdescoord] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let curcoord = await Location.geocodeAsync(curLoc);
      let descoord = await Location.geocodeAsync(desLoc);

      setLocation(location);
      setcurcoord(curcoord);
      setdescoord(descoord);
    })();
  }, []);

  let loctext = 'Waiting..';
  if (errorMsg) {
    loctext = errorMsg;
  } else if (location) {
    loctext = JSON.stringify(location["coords"]["latitude"])+" "+JSON.stringify(location["coords"]["longitude"]);
  }

  let curlattext = 'invalid';
  let curlngtext = 'invalid';
  let deslattext = 'invalid';
  let deslngtext = 'invalid';
  if (curcoord !== null && curcoord.length !== 0){
    curlattext = curcoord[0]["latitude"];
    curlngtext = curcoord[0]["longitude"];
  }

  if (descoord !== null && descoord.length !== 0){
    deslattext = descoord[0]["latitude"];
    deslngtext = descoord[0]["longitude"];
  }

  let validText = 'Searching...';
  if (curlattext === 'invalid' || curlngtext === 'invalid'){
    validText = 'Starting Location is an invalid address!';
    if (deslattext === 'invalid' || deslngtext === 'invalid'){
      validText = 'Starting Location and Destination are invalid addresses!';
    }
  }
  else if (deslattext === 'invalid' || deslngtext === 'invalid'){
    validText = 'Destination is an invalid address!';
  }
  else if (parseFloat(curlattext) < 1.22 || parseFloat(curlattext) > 1.47 || parseFloat(curlngtext) < 103.60 || parseFloat(curlngtext) > 104.04){
    validText = 'Starting Location is out of Singapore';
    if (parseFloat(deslattext) < 1.22 || parseFloat(deslattext) > 1.47 || parseFloat(deslngtext) < 103.60 || parseFloat(deslngtext) > 104.04){
      validText = 'Starting Location and Destination is out of Singapore';
    }
  }
  else if (parseFloat(deslattext) < 1.22 || parseFloat(deslattext) > 1.47 || parseFloat(deslngtext) < 103.60 || parseFloat(deslngtext) > 104.04){
    validText = 'Destination is out of Singapore';
  }
  else {
    validText = 'Searching for route...';
  }
  
  let passCoord = {curlattext,curlngtext,deslattext,deslngtext};
  const [resultJson, setresultJson] = useState('');

  function getJsonData(lat1,lng1,lat2,lng2) {
    //using ngrok to host localhost
    fetch('http://165d-2406-3003-2003-10fa-d58d-cf27-468c-de83.ngrok.io/routes?start='+lat1+','+lng1+'&end='+lat2+','+lng2,
    {method: "GET"}).then((response) => response.json())
    .then((responseJson) => {
      setresultJson(JSON.stringify(responseJson))
    })
    .catch((error) => {
      console.error(error)
    });
  }
  if (validText == 'Searching for route...'){
    getJsonData(curlattext,curlngtext,deslattext,deslngtext);
    if (resultJson !== ''){
      validText = 'Press Search to see directions!';
    }
  }

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

        <View style={styles.homeSpace}>
          <Text style={styles.inputText}>Starting Location:</Text>
          <Text style={styles.addressText}>{curLoc}</Text>
        </View>
        <View style={styles.homeSpace2}>
          <Text style={styles.inputText}>Destination:</Text>
          <Text style={styles.addressText}>{desLoc}</Text>
        </View>

        <View style={styles.homeSpace3}>
          <Text style={styles.errorText}>{validText}</Text>
        </View>
        
        <View style={styles.buttonSpace}>
          <Button style={styles.inputButton}
           title="Search" disabled={validText !== 'Press Search to see directions!'} onPress={() => {navigation.navigate('Mapview',resultJson)}} />
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

  homeSpace: {
    marginTop: '20%',
    width: '100%',
    alignItems: 'center',
  },

  homeSpace2: {
    marginTop: '10%',
    width: '100%',
    alignItems: 'center',
  },

  homeSpace3: {
    marginTop: '20%',
    width: '100%',
    alignItems: 'center',
  },

  buttonSpace: {
    marginTop: '5%',
    width: '100%',
    alignItems: 'center',
  },

  inputText: {
    fontSize: 15,
    color: 'white',
  },

  addressText: {
    fontSize: 20,
    color: 'white',
  },

  errorText: {
    fontSize: 12,
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