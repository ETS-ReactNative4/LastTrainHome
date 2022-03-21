import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Platform, TouchableOpacity, ScrollView, Image } from 'react-native';
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true
    }
  }
})

export default function Direction({ navigation, route }) {
  const passRoute = route.params;

  var inputData = JSON.parse(passRoute)["data"]
  var inputDataLen = inputData.length

  const triggerNotifications = async () => {
    await Notifications.scheduleNotificationAsync({
    content: {
    title: "Last Train Home",
    body: "You need to leave the place at "+new Date(inputData[0]["startTime"]).toLocaleTimeString().slice(0, -3),
    data: { data: "goes here" },
    },
    trigger: { seconds: 2 },
    });
    }
 
  var cardloop = []
  for (let i = 0 ; i < inputDataLen ; i++) {
    var startTime = new Date(inputData[i]["startTime"])
    var endTime = new Date(inputData[i]["endTime"])
    var timeName = startTime.toLocaleTimeString().slice(0, -3)+" to "+endTime.toLocaleTimeString().slice(0, -3)
    if (inputData[i]["mode"] == "BUS"){
      var mode = "Take Bus "+inputData[i]["routeShortName"]
      var textColor = '#841584'
      var imageLink = require('../assets/images/bus.png')
    }
    else if (inputData[i]["mode"] == "SUBWAY"){
      var mode = "Take "+inputData[i]["routeShortName"]+" MRT"
      var imageLink = require('../assets/images/mrt.png')
      if (inputData[i]["routeShortName"] == 'EW'){
        var textColor = 'green'
      }
      else if (inputData[i]["routeShortName"] == 'NS'){
        var textColor = '#e60000'
      }
      else if (inputData[i]["routeShortName"] == 'NE'){
        var textColor = '#841584'
      }
      else if (inputData[i]["routeShortName"] == 'CC'){
        var textColor = '#d4a202'
      }
      else if (inputData[i]["routeShortName"] == 'DT'){
        var textColor = '#0008a1'
      }
      else{
        var textColor = '#000'
      }
    }
    else if (inputData[i]["mode"] == "WALK"){
      var mode = "Walk"
      var textColor = '#000'
      var imageLink = require('../assets/images/walk.png')
    }
    else if (inputData[i]["mode"] == "TRAM"){
      var mode = "Take "+inputData[i]["routeShortName"]+" LRT"
      var textColor = '#858585'
      var imageLink = require('../assets/images/mrt.png')
    }
    var fromPlace = inputData[i]["from"]["name"]
    var toPlace = inputData[i]["to"]["name"]
    cardloop.push(
      <TouchableOpacity style={styles.card} key={i}>
          <Text style={styles.cardTextTime}>{timeName}</Text>
          <Image style={styles.image} source={imageLink} />
          <Text style={styles.cardText}><Text style={{color : textColor, fontWeight : 'bold'}}>{mode}</Text> from {fromPlace} to {toPlace}</Text>
      </TouchableOpacity>
    )
  }

  return (  
    <View style={styles.container}>
    <Button onPress={triggerNotifications} 
      title="Set Notifications" color="#841584" accessibilityLabel="Trigger Local Notifications"/>
    <ScrollView style={styles.scrollView}>
      {cardloop}
    </ScrollView>  
    </View>
  );
};


const styles = StyleSheet.create({
    container: {

    },

    scrollView: {
      marginBottom: 50
    },

    image: {
      width: 40,
      height: 40,
      flex: 1,
      left: 330,
      marginTop: 10,
    },

    cardTextTime: {
      fontSize: 25,
      padding: 5,
      position: 'absolute'
    },
    
    cardText: {
      fontSize: 15,
      padding: 5
    },

    card: {
      backgroundColor:'#fff',
      marginBottom: 10,
      marginLeft: '2%',
      width: '96%',
      shadowColor: '#000',
      shadowOpacity: 1,
      shadowOffset: {
        width: 3,
        height: 3,
      },
    }
});