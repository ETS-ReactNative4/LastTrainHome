import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, Platform, TouchableOpacity } from 'react-native';


export default function Direction({ navigation }) {
  const timeList = ['11.13 P.M - 11:20 P.M', '11.20 P.M - 11:45 P.M', '11.45 P.M - 11:50 P.M'] //passed from mapScreen
  const dirList = ['1. Walk to BP MRT', '2. Take MRT from BP to CD', '3.Walk to Blk 2 DEF'] //passed from mapScreen

  var cardloop = []
  for (let i = 0 ; i < dirList.length ; i++) {
    cardloop.push(
      <TouchableOpacity style={styles.card} key={i}>
          <Text style={styles.cardTextTime}>{timeList[i]}</Text>
          <Text style={styles.cardText}>{dirList[i]}</Text>
      </TouchableOpacity>
    )
  }

  return (  
    <View style={styles.container}>
      {cardloop}
      <Button
      //push notification function
        title="Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      marginTop: 40
    },

    cardTextTime: {
      fontSize: 25,
      padding: 10
    },
    
    cardText: {
      fontSize: 16,
      padding: 10
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