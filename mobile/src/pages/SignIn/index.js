/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useContext, useEffect} from 'react';
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
import Toast from 'react-native-toast-message';
import Grandpa from '../../assets/Grandpa.png';

const SignIn = () => {
  const navigation = useNavigation();
  const {signIn, error} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    signIn(email, password);
  };

  function showToast() {
    Toast.show({
      type: 'error',
      text1: error,
    });
  }

  useEffect(() => {
    if (error) {
      showToast();
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <Image source={Grandpa} style={styles.image} />

      <Toast visible={showToast} message="Isso é uma mensagem de Toast!" />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType={'default'}
        autoCapitalize="none"
        textContentType={'emailAddress'}
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
        Não tem uma conta? Inscreva-se.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Iniciar sessão</Text>
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
    color: '#007aff',
    marginVertical: 10,
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: '#007aff',
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
