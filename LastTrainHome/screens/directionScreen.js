import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Platform, TouchableOpacity, ScrollView } from 'react-native';
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
    }
    else if (inputData[i]["mode"] == "SUBWAY"){
      var mode = "Take "+inputData[i]["routeShortName"]+" MRT"
    }
    else if (inputData[i]["mode"] == "WALK"){
      var mode = "Walk"
    }
    var fromPlace = inputData[i]["from"]["name"]
    var toPlace = inputData[i]["to"]["name"]
    cardloop.push(
      <TouchableOpacity style={styles.card} key={i}>
          <Text style={styles.cardTextTime}>{timeName}</Text>
          <Text style={styles.cardText}>{mode} from {fromPlace} to {toPlace}</Text>
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

    },

    cardTextTime: {
      fontSize: 25,
      padding: 5
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