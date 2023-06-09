import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';

function CardWithImage({id, title, image}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', padding: 15}}>
      <View style={styles.container}>
        {image ? <Image style={styles.image} source={{uri: image}} /> : <></>}
        <View style={styles.textContainer}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 220,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    margin: 0,
    padding: 0,
    elevation: 5, // adicionar sombra
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: '100%',
    height: '75%',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#27B4FD',
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
});
export default CardWithImage;
