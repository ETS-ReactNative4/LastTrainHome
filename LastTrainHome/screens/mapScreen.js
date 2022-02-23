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

class App extends React.Component {

  _goToMyPosition = (lat, lon) => {
    this.refs['Map_Ref'].injectJavaScript(`
      mymap.setView([${lat}, ${lon}], 18)
      L.marker([${lat}, ${lon}]).addTo(mymap)
    `)
  }

  _setMarker = (lat, lon) => {
    this.refs['Map_Ref'].injectJavaScript(`
      var marker = L.marker([${lat}, ${lon}]);
      marker.addTo(mymap);
      `)
  }

  render() {
    const curLocLat = 1.311549; //passed from homeScreen
    const curLocLong = 103.749655; //passed from homeScreen
    const desLocLat = 1.32036; //passed from homeScreen
    const desLocLong = 103.800153; //passed from homeScreen
    const routeName = "BLK 256 ABC to Blk 2 DEF" //passed from homeScreen
    const timeName = "11:12 PM to 11:50 PM" //passed from homeScreen
    const routeGeometry = "yr`oAm`k{dEksAstD~e@iW`e@{UxtAqr@pd@sVrOmItC}GZ}GJwDeSmWkm@gb@qKuEyCwE}AgHJiH\\kE{BaRoCoEsGcLiE{N{AmQvB{QbFkN|E}FzMcPtQmTh|A_iBfCcDzHcKpJaMr\\w_@t\\i`@hb@gg@lAkJRqJg@wJeCoMgQ{f@qHsTuC_FiMsT_S_ViVkPkfAyi@oXiNq{@q_@qn@cU{SsGgEqAiDeAcTsGcd@eMoF{AoBi@uGkB}d@uMwDoA_EsA{QiG_VyJaSkLkQuN}CgDqJkKqDsFqE_H}CuE}CyEsBsGcDeKuK}f@}FiJ_FaEkKiEgHcAe~@xMsr@`LqMrB_En@gAy`@kBkVwE{W_^gbAkHg[aFeQaRe^_Nea@iEwYJkYsAyj@KiRkGglAcDqn@KiUrDkc@nFkY`Lo]lIeQfJgOfcAyhAzJ}KtPsTjIuQxFaQrBcN|E{u@rDgh@hBuYjDy_@zHoUbI}O|PwSkDuBiP_K{]cTq_Ack@ixAe|@_L}G{LoHynBujAsh@iZiRqK}|@ig@xg@wo@v{@_gA~q@g}@fUgZp^{`@gDqLv`@oNfTwH~LcIl@gEy@{PqU_V_`@cuAvHwJt^_MvXgMxCaD"
    var polyUtil = require('polyline-encoded');
    var encoded = routeGeometry;

    if (encoded !== undefined || encoded !== '' || encoded != null ) {
      var latlngs = polyUtil.decode(encoded, {
        precision: 6
      });}

    var polylinePoints = ""
    for (let i=0 ; i<latlngs.length ; i++){
      polylinePoints += ("[" + latlngs[i].toString() + "],")
    }
    polylinePoints = "[" + polylinePoints + "]"
    console.log(polylinePoints)
      
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
           var bounds = polyline.getBounds();
           polyline.addTo(mymap);
           mymap.fitBounds(bounds);
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
    fontSize: 20,
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