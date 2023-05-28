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
import SelectDropdown from 'react-native-select-dropdown';
import DateTimePicker from '@react-native-community/datetimepicker';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import Toast from 'react-native-toast-message';

import {useNavigation, useFocusEffect} from '@react-navigation/native';
import api from '../../services/api';

import oldman from '../../assets/oldman.png';
import Header from '../../components/Header';

const EditUtente = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const patient = route.params.id;

  const [name, setName] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const dropdownRef = useRef(null);

  //const [selectedUser, setSelectedUser] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date(1980, 0, 1));
  const [selectedSexo, setSelectedSexo] = useState(null);
  const [users, setUsers] = useState([]);

  async function getPatient(patientId) {
    try {
      const response = await api.get('/patients/' + patientId);

      const patientData = response.data.body;

      if (patientData) {
        setName(patientData.name);
        setSelectedSexo(patientData.sex);

        const dateTime = new Date(patientData.birth_date);
        const birthDate = new Date(
          dateTime.getFullYear(),
          dateTime.getMonth(),
          dateTime.getDate(),
        );
        setDate(birthDate);

        const associatedUser = patientData.users[0]._id;
        setSelectedUser(associatedUser);
        const index = users.findIndex(user => user.value === associatedUser);
        dropdownRef.current.selectIndex(index);
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getPatient(patient);
    }, [patient]),
  );

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await api.get('/users?type=user');
        const data = response.data.body;

        if (data) {
          const usersOptions = data.map(item => {
            return {
              label: item.name,
              value: item._id,
            };
          });
          setUsers(usersOptions);
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
    getUsers();
  }, []);

  const sexoOptions = [
    {label: 'Masculino', value: 'Masculino'},
    {label: 'Feminino', value: 'Feminino'},
  ];

  const handleSubmit = async () => {
    if (!name || !selectedSexo || !date) {
      showToast('empty');
      return;
    }

    const data = {
      name: name,
      sex: selectedSexo,
      users: selectedUser,
      birth_date: date,
    };

    try {
      const editUtente = await api.put('/patients/' + patient, data);

      if (editUtente) {
        showToast('success');
        navigation.navigate('ListUtentes');
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
        text1: 'Sucesso, utente atualizado!',
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
  }
  const showDateTimePicker = () => {
    setShowPicker(true);
  };
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  return (
    <ScrollView>
      <Header />

      <Text style={styles.headerTitle}>Editar utente</Text>
      <View style={styles.container}>
        <Image source={oldman} style={styles.image} />
        <Toast visible={showToast} message="Isso é uma mensagem de Toast!" />

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          onChangeText={text => setName(text)}
          value={name}
        />

        <Text style={styles.label}>Sexo</Text>
        <RadioForm formHorizontal={true} style={{marginBottom: 10}}>
          {sexoOptions.map(option => (
            <RadioButton labelHorizontal={true} key={option.value}>
              <RadioButtonInput
                obj={option}
                isSelected={selectedSexo === option.value}
                onPress={() => setSelectedSexo(option.value)}
                borderWidth={1}
                buttonInnerColor={'#2196f3'}
                buttonOuterColor={
                  selectedSexo === option.value ? '#2196f3' : '#000'
                }
                buttonSize={20}
                buttonOuterSize={30}
                buttonStyle={{}}
                buttonWrapStyle={{marginLeft: 10}}
              />
              <RadioButtonLabel
                obj={option}
                labelHorizontal={true}
                onPress={() => setSelectedSexo(option.value)}
                labelStyle={{
                  fontSize: 16,
                  color: selectedSexo === option.value ? '#2196f3' : '#000',
                }}
                labelWrapStyle={{}}
              />
            </RadioButton>
          ))}
        </RadioForm>

        <TouchableOpacity
          style={styles.datePicker}
          onPress={showDateTimePicker}>
          <Text style={styles.labelDate}>Selecione data de nascimento</Text>
        </TouchableOpacity>

        {showPicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            maximumDate={new Date(1980, 0, 1)} // Impede a seleção de datas futuras.
            is24Hour={true}
            display="default"
            onChange={handleDateChange}
            themeVariant="light"
          />
        )}
        <TextInput
          style={styles.disabledTextInput}
          value={date.toLocaleDateString()}
          editable={false}
        />

        <Text style={styles.label}>Selecione um parente</Text>

        <SelectDropdown
          data={users}
          ref={dropdownRef}
          onSelect={(selectedUser, index) =>
            setSelectedUser(selectedUser.value)
          }
          defaultButtonText="--"
          buttonTextAfterSelection={(selectedUser, index) => selectedUser.label}
          rowTextForSelection={(item, index) => item.label}
          buttonStyle={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Atualizar Utente</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
    width: '35%',
    resizeMode: 'contain',
    marginTop: -500,
    marginBottom: -520,
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
