import React, {useContext, useState, useEffect, useRef} from 'react';
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
import AuthContext from '../../contexts/auth';

import {useNavigation, useFocusEffect} from '@react-navigation/native';
import api from '../../services/api';

import oldman from '../../assets/oldman.png';
import Header from '../../components/Header';

const EditUtente = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const patient = route.params.id;

  const {user} = useContext(AuthContext);
  console.log(user.type);

  const [name, setName] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const dropdownRef = useRef(null);
  const scrollViewRef = useRef(null);

  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date(1980, 0, 1));
  const [selectedSexo, setSelectedSexo] = useState(null);
  const [users, setUsers] = useState([]);

  const [cuidadores, setCuidadores] = useState([]);
  const [selectedCuidador, setSelectedCuidador] = useState('');
  const dropdownRefCuidador = useRef(null);

  async function getPatient(patientId) {
    try {
      const response = await api.get('/patients/' + patientId);

      const patientData = response.data.body;
      console.log(patientData);
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

        const associatedUser = patientData.users[0]?._id;
        const associatedCuidador = patientData.users[1]?._id;
        getUsers(associatedUser, associatedCuidador);

        
        
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async function getUsers(associatedUser, associatedCuidador) {
    try {
      const response = await api.get('/users');
      const data = response.data.body;

      if (data) {
        const usersOptions = data.filter(item => item.type == "user").map(item => {
          return {
            label: item.name,
            value: item._id,
          };
        });
        setUsers(usersOptions);
        setSelectedUser(associatedUser);
        const index = usersOptions.findIndex(user => user.value === associatedUser);
        dropdownRef.current.selectIndex(index);

        const cuidadoresOptions = data.filter(item => item.type == "caretaker").map(item => {
          return {
            label: item.name,
            value: item._id,
          };
        });
        setCuidadores(cuidadoresOptions);
        setSelectedCuidador(associatedCuidador);
        const index1 = cuidadoresOptions.findIndex(user => user.value === associatedCuidador);
        dropdownRefCuidador.current.selectIndex(index1);
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
      users: [selectedUser,selectedCuidador],
      birth_date: date,
    };

    try {
      const editUtente = await api.put('/patients/' + patient, data);

      if (editUtente) {
        showToast('success');
        setTimeout(() => {
          navigation.navigate('ListUtentes');
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      showToast('error');
    }
  };

  function showToast(type) {
    scrollViewRef.current.scrollTo({y: 0, animated: true});
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
    <ScrollView ref={scrollViewRef}>
      <Header title="Editar Utente" view="ListUtentes"/>

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
                buttonInnerColor={'green'}
                buttonOuterColor={
                  selectedSexo === option.value ? 'green' : '#000'
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
                  color: selectedSexo === option.value ? 'green' : '#000',
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
          disabled={user.type == "admin" ? false : true}
          onSelect={(selectedUser, index) =>
            setSelectedUser(selectedUser.value)
          }
          defaultButtonText="--"
          buttonTextAfterSelection={(selectedUser, index) => selectedUser.label}
          rowTextForSelection={(item, index) => item.label}
          buttonStyle={styles.input}
        />

        <Text style={styles.label}>Selecione um cuidador</Text>

        <SelectDropdown
          data={cuidadores}
          ref={dropdownRefCuidador}
          disabled={user.type == "admin" ? false : true}
          onSelect={(selectedCuidador, index) =>
            setSelectedCuidador(selectedCuidador.value)
          }
          defaultButtonText="--"
          buttonTextAfterSelection={(selectedCuidador, index) => selectedCuidador.label}
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
    backgroundColor: 'green',
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
