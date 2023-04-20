import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AuthContext from '../../contexts/auth';

import Grandpa from '../../assets/Grandpa.png';

const SignIn = () => {
  const navigation = useNavigation();
  const {isSigned, signIn} = useContext(AuthContext);

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    console.log(login);
    signIn(login, password);
    console.log("acabou");
  };

  return (
    <View style={styles.container}>
      <Image source={Grandpa} style={styles.image} />
      <Text style={styles.label}>Login</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setLogin(text)}
        value={login}
        keyboardType={'default'}
        autoCapitalize='none'
        textContentType={'username'}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setPassword(text)}
        value={password}
        textContentType={'password'}
        secureTextEntry={true}
      />
      <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
        Don't have an account? Sign up
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f5fc',
  },
  image: {
    width: '60%',
    height: 300,
    resizeMode: 'contain',
  },
  label: {
    color: '#484848',
    fontSize: 16,
    marginBottom: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: '10%',
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: '#666666',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 16,
    padding: 9,
  },
  link: {
    fontSize: 16,
    textDecorationLine: 'underline',
    color: '#08a8f8',
    marginVertical: 10,
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: '#27B4FD',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
  },
});

export default SignIn;
