import React, {useContext, useEffect, useState, useRef} from 'react';
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
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import Toast from 'react-native-toast-message';

import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';

import clipboard from '../../assets/clipboard.png';
import Header from '../../components/Header';
import StyledSwitch from '../../components/StyledSwitch';
import StarRatingComponent from '../../components/RatingStars';
import AuthContext from '../../contexts/auth';

const AddRegisto = () => {
  const navigation = useNavigation();
  const {user} = useContext(AuthContext);
  const scrollViewRef = useRef(null);

  const [extra, setExtra] = useState('');
  const [selectedUtente, setSelectedUtente] = useState('');
  const [utentes, setUtentes] = useState([]);
  const [banho, setBanho] = useState(false);
  const [pequenoAlmoco, setPequenoAlmoco] = useState(false);
  const [almoco, setAlmoco] = useState(false);
  const [jantar, setJantar] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    async function getUtentes() {
      try {
        const response = await api.get('/patients');
        const patients = response.data.body;

        if (patients) {
          const usersOptions = patients.map(item => {
            return {
              label: item.name,
              value: item._id,
            };
          });
          setUtentes(usersOptions);
        }
      } catch (error) {
        console.error(error);
        return null;
      }
    }
    getUtentes();
  }, []);

  const handleSubmit = async () => {
    if (!selectedUtente) {
      showToast('empty');
      return;
    }

    const data = {
      patient: selectedUtente,
      dayClassification: rating,
      bath: banho,
      breakfast: pequenoAlmoco,
      lunch: almoco,
      dinner: jantar,
      extra: extra,
      caretaker: user.name,
    };

    try {
      const addUtente = await api.post('/dailyRecords', data);

      if (addUtente) {
        showToast('success');
        setAlmoco(false);
        setJantar(false);
        setBanho(false);
        setRating(0);
        setExtra("");
        setPequenoAlmoco(false);
        setTimeout(() => {
          navigation.navigate('ListRegistos');
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      showToast('error');
    }
  };

  function showToast(type) {
    scrollViewRef.current.scrollTo({ y: 0, animated: true });
    if (type === 'success') {
      Toast.show({
        type: 'success',
        text1: 'Sucesso, registo criado!',
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

  return (
    <ScrollView ref={scrollViewRef}>
      <Header />

      <Text style={styles.headerTitle}>Adicionar registo</Text>

      <View style={styles.container}>
        <Image source={clipboard} style={styles.image} />
        <Toast visible={showToast} message="Isso é uma mensagem de Toast!" />

        <Text style={styles.label}>Selecione o utente</Text>

        <SelectDropdown
          data={utentes}
          onSelect={(selectedItem, index) =>
            setSelectedUtente(selectedItem.value)
          }
          defaultButtonText="--"
          buttonTextAfterSelection={(selectedItem, index) => selectedItem.label}
          rowTextForSelection={(item, index) => item.label}
          buttonStyle={styles.input}
        />

        <StyledSwitch
          label="Banho"
          isSwitchOn={banho}
          setIsSwitchOn={setBanho}
        />

        <StyledSwitch
          label="Pequeno almoço"
          isSwitchOn={pequenoAlmoco}
          setIsSwitchOn={setPequenoAlmoco}
        />

        <StyledSwitch
          label="Almoço"
          isSwitchOn={almoco}
          setIsSwitchOn={setAlmoco}
        />

        <StyledSwitch
          label="Jantar"
          isSwitchOn={jantar}
          setIsSwitchOn={setJantar}
        />

        <Text style={styles.label}>Pontuação diária</Text>
        <StarRatingComponent rating={rating} setRating={setRating} />

        <Text style={styles.label}>Extra</Text>
        <TextInput
          style={styles.textArea}
          onChangeText={text => setExtra(text)}
          value={extra}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Criar Registo</Text>
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
    marginTop: -150,
    marginBottom: -150,
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
  textArea: {
    width: '90%',
    borderColor: '#666666',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 16,
    padding: 9,
    height: 80,
    textAlignVertical: 'top',
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

export default AddRegisto;
