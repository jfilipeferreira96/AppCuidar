import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import Toast from 'react-native-toast-message';

import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';

import user from '../../assets/user.png';

const SignUp = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedOption, setSelectedOption] = useState('admin');

  const options = [
    {label: 'Admin', value: 'admin'},
    {label: 'User', value: 'user'},
    {label: 'Care Taker', value: 'caregiver'},
  ];

  const handleSubmit = async () => {
    if (name === '' || email === '' || password === '') {
      return;
    }

    const data = {
      name,
      email,
      password,
      option: options.find(option => option.value === selectedOption),
    };
    console.log(data);

    try {
      const signup = await api.post('/auth/register', JSON.stringify(data));
      console.log(signup);
      if (signup) {
        showToast('success');
        navigation.navigate('SignIn');
      } else {
        showToast('error');
      }
    } catch (error) {
      console.error(error);
    }
  };

  function showToast(type) {
    if (type === 'success') {
      Toast.show({
        type: 'success',
        text1: 'Success, your account has been created!',
      });
    }
    if (type === 'error') {
      Toast.show({
        type: 'error',
        text1: 'Something went error, please try again!',
      });
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={user} style={styles.image} />
        <Toast visible={showToast} message="Isso é uma mensagem de Toast!" />
        <Text style={styles.label}>Choose an Option:</Text>
        <RadioForm formHorizontal={true}>
          {options.map(option => (
            <RadioButton labelHorizontal={true} key={option.value}>
              <RadioButtonInput
                obj={option}
                isSelected={selectedOption === option.value}
                onPress={() => setSelectedOption(option.value)}
                borderWidth={1}
                buttonInnerColor={'#2196f3'}
                buttonOuterColor={
                  selectedOption === option.value ? '#2196f3' : '#000'
                }
                buttonSize={20}
                buttonOuterSize={30}
                buttonStyle={{}}
                buttonWrapStyle={{marginLeft: 10}}
              />
              <RadioButtonLabel
                obj={option}
                labelHorizontal={true}
                onPress={() => setSelectedOption(option.value)}
                labelStyle={{
                  fontSize: 16,
                  color: selectedOption === option.value ? '#2196f3' : '#000',
                }}
                labelWrapStyle={{}}
              />
            </RadioButton>
          ))}
        </RadioForm>

        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setName(text)}
          value={name}
        />

        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setUsername(text)}
          value={name}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setEmail(text)}
          value={email}
          keyboardType={'email-address'}
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

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    resizeMode: 'contain',
    marginBottom: -30,
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
  button: {
    width: '90%',
    height: 50,
    backgroundColor: '#27B4FD',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFF',
  },
});

export default SignUp;
