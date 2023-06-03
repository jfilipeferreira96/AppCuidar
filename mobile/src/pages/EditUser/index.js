import React, {useState, useEffect, useRef} from 'react';
import {useRoute} from '@react-navigation/native';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import Toast from 'react-native-toast-message';

import {useNavigation, useFocusEffect} from '@react-navigation/native';
import api from '../../services/api';

import Header from '../../components/Header';
import userlogo from '../../assets/user.png';

const EditUtente = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const user = route.params.id;
  const scrollViewRef = useRef(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [password, setPassword] = useState('');
  const [originalPassword, setOriginalPassword] = useState('');

  const options = [
    {label: 'Admin', value: 'admin'},
    {label: 'Utilizador', value: 'user'},
    {label: 'Cuidador', value: 'caretaker'},
  ];

  async function getUser(userId) {
    try {
      const response = await api.get('/users/' + userId);
      const data = response.data.body;

      if (data) {
        setName(data.name);
        setEmail(data.auth.email);
        setOriginalPassword(data.auth.password);
        setPassword('');
        setSelectedOption(data.type);
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getUser(user);
    }, [user]),
  );

  const handleSubmit = async () => {
    if (!name || !email) {
      showToast('empty');
      return;
    }

    let passwordUpdate = password;
    if (passwordUpdate.length === 0) {
      passwordUpdate = originalPassword;
    }

    const data = {
      name: name,
      auth: {email: email, password: passwordUpdate},
      type: options.find(option => option.value === selectedOption).value,
    };

    try {
      const editUser = await api.put('/users/' + user, data);

      if (editUser) {
        showToast('success');
        setTimeout(() => {
          navigation.navigate('ListUsers');
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      showToast('error');
    }
  };

  function showToast(type) {
    if (type === 'success') {
      Toast.show({
        type: 'success',
        text1: 'Sucesso, utilziador atualizado!',
      });
    }
    if (type === 'error') {
      Toast.show({
        type: 'error',
        text1: 'Algo correu mal, por favor tente novamente!',
      });
    }
    if (type === 'empty') {
      Toast.show({
        type: 'error',
        text1: 'Por favor, preencha todos os campos.',
      });
    }
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
  }

  return (
    <View style={{ flex: 1 }}>
    <ScrollView ref={scrollViewRef}>
      <Header />

      <Text style={styles.headerTitle}>Editar utilizador</Text>
      <View style={styles.container}>
        <Image source={userlogo} style={styles.image} />
        <Toast visible={showToast} message="Isso é uma mensagem de Toast!" />

        <Text style={styles.label}>Selecione uma opção:</Text>
        <RadioForm formHorizontal={true}>
          {options.map(option => (
            <RadioButton labelHorizontal={true} key={option.value}>
              <RadioButtonInput
                obj={option}
                isSelected={selectedOption === option.value}
                onPress={() => setSelectedOption(option.value)}
                borderWidth={1}
                buttonInnerColor={'#007aff'}
                buttonOuterColor={
                  selectedOption === option.value ? '#007aff' : '#000'
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
                  color: selectedOption === option.value ? '#007aff' : '#000',
                }}
                labelWrapStyle={{}}
              />
            </RadioButton>
          ))}
        </RadioForm>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setName(text)}
          value={name}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setEmail(text)}
          value={email}
          autoCapitalize="none"
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
          <Text style={styles.buttonText}>Atualizar Utilizador</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
  },
  disabledTextInput: {
    backgroundColor: '#f2f2f2',
    color: 'black',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 4,
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonDropdown: {
    width: '90%',
    height: 50,
    borderColor: '#666666',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 16,
    padding: 9,
    color: '#484848',
  },
  datePicker: {
    width: '90%',
    height: 50,
    borderColor: '#666666',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 16,
    padding: 9,
    color: 'black',
  },
  image: {
    width: '60%',
    resizeMode: 'contain',
    marginBottom: -30,
  },
  labelDate: {
    color: '#484848',
    fontSize: 16,
    alignSelf: 'center',
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
    backgroundColor: '#007aff',
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

export default EditUtente;
