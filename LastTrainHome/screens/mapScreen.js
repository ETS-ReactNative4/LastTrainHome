import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Button
} from 'react-native';

import {
  WebView
} from 'react-native-webview'

import html_script from '../leaflet/html_script'
import data from '../leaflet/test3'

class App extends React.Component {

  render() {
    var inputData = data["data"]
    var inputDataLen = inputData.length
    const curLocLat = inputData[0]["from"]["lat"]
    const curLocLong = inputData[0]["from"]["lon"]
    const desLocLat = inputData[inputDataLen-1]["to"]["lat"]
    const desLocLong = inputData[inputDataLen-1]["to"]["lon"]
    const routeName = inputData[0]["from"]["name"]+" to "+ inputData[inputDataLen-1]["to"]["name"]
    
    var startTime = new Date(inputData[0]["startTime"])
    var endTime = new Date(inputData[inputDataLen-1]["endTime"])
    const timeName = startTime.toLocaleDateString()+" - "+startTime.toLocaleTimeString().slice(0, -3)+" to "+endTime.toLocaleTimeString().slice(0, -3)

    var polyUtil = require('polyline-encoded');
    var polylinePoints = ""
    for (let i=0 ; i<inputData.length ; i++){
      var encoded = inputData[i]["legGeometry"]["points"]
      if (encoded !== undefined || encoded !== '' || encoded != null ) {
        var latlngs = polyUtil.decode(encoded, {
          precision: 5
        });}
  
      for (let i=0 ; i<latlngs.length ; i++){
        polylinePoints += ("[" + latlngs[i].toString() + "],")
      } 
    }
    polylinePoints = "[" + polylinePoints + "]"

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.Container}>
          <WebView ref={'Map_Ref'}  source={{html: html_script}} style={styles.Webview} 
          injectedJavaScript={`
          var curMarker = L.marker([${curLocLat}, ${curLocLong}]);
          curMarker.addTo(mymap);
          var desMarker = L.marker([${desLocLat}, ${desLocLong}]);
          desMarker.addTo(mymap);

          var polyline = L.polyline(${polylinePoints}
            ,{color: "purple",weight: 5,smoothFactor: 1});
          polyline.addTo(mymap);
          `}
          />
          <TouchableOpacity style={styles.card}>
            <Text style={styles.mapText}>{routeName}</Text>
            <Text style={styles.mapText}>{timeName}</Text>
          </TouchableOpacity>
          <View style={styles.buttonView}>
            <Button style={styles.inputButton}
            title="Direction" onPress={() => {this.props.navigation.navigate('Direction')}} />
          </View>
        </SafeAreaView>
      </>
    );
  }
  
};

const styles = StyleSheet.create({
  Container: {
    flex:1,
    backgroundColor: 'grey'
  },
  Webview: {
    flex: 2,
  },
    card: {
    backgroundColor:'#fff',
    marginBottom: 10,

    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  mapText: {
    fontSize: 15,
  },

  buttonView: {
    display: 'flex',
    flexDirection: 'row',
  },

  inputButton: {
    width: '100px',
    height: '30px',
  }
});

export default App;