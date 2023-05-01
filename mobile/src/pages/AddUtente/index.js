import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  Picker,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Toast from 'react-native-toast-message';

import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';

import oldman from '../../assets/oldman.png';

const AddUtente = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  const handleSubmit = async () => {
    if (name === '') {
      return;
    }

    const data = {
      name,
    };

    try {
      const signup = await api.post('/utente/add', data);

      if (signup) {
        showToast('success');
        navigation.navigate('ListUtentes');
      }
    } catch (error) {
      showToast('error');
    }
  };

  function showToast(type) {
    if (type === 'success') {
      Toast.show({
        type: 'success',
        text1: 'Sucesso, utente criado!',
      });
    }
    if (type === 'error') {
      Toast.show({
        type: 'error',
        text1: 'Algo correu mal, por favor tente novamente!',
      });
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={oldman} style={styles.image} />
        <Toast visible={showToast} message="Isso é uma mensagem de Toast!" />

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setName(text)}
          value={name}
        />

        <Text style={styles.label}>Localidade</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setName(text)}
          value={name}
        />

        <Text style={styles.label}>Data de Nascimento</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setName(text)}
          value={name}
        />

        <Picker
          selectedValue={selectedUser}
          style={{height: 50, width: 150}}
          onValueChange={(itemValue, itemIndex) => setSelectedUser(itemValue)}>
          <Picker.Item label="Zé Manel" value="1" />
          <Picker.Item label="Zé Carlos" value="2" />
        </Picker>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Criar Utente</Text>
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

export default AddUtente;
