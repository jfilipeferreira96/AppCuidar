import React, {useContext} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import AuthContext from '../../contexts/auth';

const Dashboard = () => {
  const {isSigned, user, signOut} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome,</Text>
      <Text style={styles.user}>{user?.name}</Text>

      <Text style={styles.welcome}>
        This is the main screen of this project
      </Text>

      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '60%',
    resizeMode: 'contain',
  },
  welcome: {
    fontSize: 50,
    color: '#27B4FD',
    alignSelf: 'flex-start',
    paddingHorizontal: '10%',
    marginTop: -25,
  },
  user: {
    fontSize: 40,
    color: '#484848',
    alignSelf: 'flex-end',
    paddingHorizontal: '10%',
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: '#27B4FD',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 45,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
  },
});

export default Dashboard;
