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
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';
import clipboard from '../../assets/clipboard.png';
import Header from '../../components/Header';
import StyledSwitch from '../../components/StyledSwitch';
import StarRatingComponent from '../../components/RatingStars';
import AuthContext from '../../contexts/auth';
import {Collapse, CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';
import MaskInput from 'react-native-mask-input';
import DateTimePicker from '@react-native-community/datetimepicker';

const AddRegisto = () => {
  const navigation = useNavigation();
  const {user} = useContext(AuthContext);
  const scrollViewRef = useRef(null);

  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const [extra, setExtra] = useState('');
  const [bloodPreassure, setBloodPreassure] = useState('');
  const [weight, setWeight] = useState('');
  const [glucose, setGlucose] = useState('');
  const [heartRate, setHeartRate] = useState('');
  const [respiratoryRate, setRespiratoryRate] = useState('');
  const [selectedUtente, setSelectedUtente] = useState('');
  const [selectedPA, setSelectedPA] = useState('');
  const [selectedBanho, setSelectedBanho] = useState('');
  const [selectedAlmoco, setSelectedAlmoco] = useState('');
  const [selectedJantar, setSelectedJantar] = useState('');
  const [selectedToilet, setSelectedToilet] = useState('');
  const [selectedAtvFisica, setSelectedAtvFisica] = useState('');
  const [utentes, setUtentes] = useState([]);
  const [banho, setBanho] = useState(false);
  const [pequenoAlmoco, setPequenoAlmoco] = useState(false);
  const [almoco, setAlmoco] = useState(false);
  const [jantar, setJantar] = useState(false);
  const [rating, setRating] = useState(0);

  const [names, setNames] = useState([{medicamento: '', horario: ''}]);

  const listPA = [
    {value: 'Todo/Autónomodo', label: 'Todo - Autónomo  [🍲/💪🏼]'},
    {value: 'Todo/Com Auxilio', label: 'Todo - Com Auxilio [🍲/🫱🏼‍🫲🏾]'},
    {value: 'Parte/Autónomo', label: 'Parte - Autónomo [🥣/💪🏼]'},
    {value: 'Parte/Com Auxilio', label: 'Parte - Com Auxilio [🥣/🫱🏼‍🫲🏾]'},
    {value: 'Recusou', label: 'Recusou [👎]'},
  ];

  const listBanho = [
    {value: 'Sim/Autónomodo', label: 'Sim - Autónomo  [👍/💪🏼]'},
    {value: 'Sim/Com Auxilio', label: 'Sim - Com Auxilio [👍/🫱🏼‍🫲🏾]'},
    {value: 'Recusou', label: 'Recusou [👎]'},
  ];

  const listCasaDeBanho = [
    {value: 'Regular', label: 'Regular [👍]'},
    {value: 'Incontinência (Sono)', label: 'Incontinência (Sono) [👎]'},
    {value: 'Incontinência (Acordado)', label: 'Incontinência (Acordado) [👎]'},
  ];

  const listAtvFisica = [
    {value: '15 a 30 minutos', label: '15 a 30 minutos'},
    {value: '30 a 45 minutos', label: '30 a 45 minutos'},
    {value: '45 a 60 minutos', label: '45 a 60 minutos'},
    {value: 'Mais do que 60 minutos', label: 'Mais do que 60 minutos'},
    {value: 'Recusou', label: 'Recusou [👎]'},
  ];

  const showDateTimePicker = () => {
    setShowPicker(true);
  };
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

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
      mealLunch: selectedAlmoco,
      mealDinner: selectedJantar,
      mealBreakfast: selectedPA,
      bathStatus: selectedBanho,
      toilet: selectedToilet,
      physicalActivity: selectedAtvFisica,
      lunch: almoco,
      registryDate: date,
      dinner: jantar,
      weight: weight,
      glucose: glucose,
      bloodPreassure: bloodPreassure,
      respiratoryRate: respiratoryRate,
      heartRate: heartRate,
      extra: extra,
      caretaker: user.name,
      medicines: names,
    };

    try {
      const addUtente = await api.post('/dailyRecords', data);

      if (addUtente) {
        showToast('success');
        setTimeout(() => {
          navigation.navigate('ListRegistos');
        }, 1000);
        setAlmoco(false);
        setJantar(false);
        setBanho(false);
        setRating(0);
        setExtra('');
        setBloodPreassure('');
        setRespiratoryRate('');
        setHeartRate('');
        setWeight('');
        setGlucose('');
        setPequenoAlmoco(false);
        setSelectedBanho('');
        setSelectedAlmoco('');
        setSelectedJantar('');
        setSelectedPA('');
        setSelectedAtvFisica('');
        setSelectedToilet('');
        setDate(new Date());
        setNames([{medicamento: '', horario: ''}]);
      }
    } catch (error) {
      console.error(error);
      showToast('error');
    }
  };

  const showToast = (type) => {
    scrollViewRef.current.scrollTo({y: 0, animated: true});
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
  };

  const handleNameChange = (index, field, value) => {
    const newNames = [...names];
    newNames[index][field] = value;
    setNames(newNames);
  };

  const addNameField = () => {
    setNames([...names, {medicamento: '', horario: ''}]);
  };

  const removeNameField = (index) => {
    const newNames = names.filter((_, idx) => idx !== index);
    setNames(newNames);
  };

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

        <Text style={styles.label}>Data do Registo</Text>
        <TouchableOpacity style={styles.dateGroup}>
          <TouchableOpacity
            style={styles.nameFieldContainer}
            onPress={showDateTimePicker}>
            
            <TextInput
            style={styles.disabledTextInput}
            value={date.toLocaleDateString()}
            editable={false}
            />
            {showPicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={'date'}
              is24Hour={true}
              maximumDate={new Date()}
              display="default"
              onChange={handleDateChange}
              themeVariant="light"
            />
          )}
          <Text style={styles.labelDate}>🗓</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <Collapse style={styles.groupMain}>
          <CollapseHeader style={styles.groupHeader}>
            <Text>Indicadores Vitais</Text>
          </CollapseHeader>
          <CollapseBody style={styles.group}>
            <Text style={styles.label}>Peso</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setWeight(text)}
              value={weight}
            />

            <Text style={styles.label}>Pressão Arterial</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setBloodPreassure(text)}
              value={bloodPreassure}
            />

            <Text style={styles.label}>Frequência cardíaca</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setHeartRate(text)}
              value={heartRate}
            />

            <Text style={styles.label}>Frequência respiratória</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setRespiratoryRate(text)}
              value={respiratoryRate}
            />

            <Text style={styles.label}>Glucose</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setGlucose(text)}
              value={glucose}
            />
          </CollapseBody>
        </Collapse>

        <Collapse style={styles.groupMain}>
          <CollapseHeader style={styles.groupHeader}>
            <Text>Medicação</Text>
          </CollapseHeader>
          <CollapseBody style={styles.group}>
            {names.map((name, index) => (
              <View key={index} style={styles.nameFieldContainer}>
                <TextInput
                  style={styles.inputMed}
                  placeholder="Medicamento"
                  value={name.medicamento}
                  onChangeText={(text) =>
                    handleNameChange(index, 'medicamento', text)
                  }
                />
                <MaskInput
                      style={styles.inputMin}
                      value={name.horario}
                      placeholder="00:00"
                      onChangeText={(masked, unmasked) => {
                        handleNameChange(index, 'horario', masked); 
                      }}
                      mask={[/\d/, /\d/, ':', /\d/, /\d/]}
                    />

                {index !== 0 && (
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeNameField(index)}
                  >
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
            <Button title="Adicionar Medicamento" onPress={addNameField} />
          </CollapseBody>
        </Collapse>

        <Collapse style={styles.groupMain}>
          <CollapseHeader style={styles.groupHeader}>
            <Text>Atividades Diárias</Text>
          </CollapseHeader>
          <CollapseBody style={styles.group}>
            <Text style={styles.label}>Banho</Text>
            <SelectDropdown
              data={listBanho}
              onSelect={(selectedItem, index) =>
                setSelectedBanho(selectedItem.value)
              }
              defaultButtonText="--"
              buttonTextAfterSelection={(selectedItem, index) =>
                selectedItem.label
              }
              rowTextForSelection={(item, index) => item.label}
              buttonStyle={styles.input}
            />

            <Text style={styles.label}>Necessidades Fisiológicas</Text>
            <SelectDropdown
              data={listCasaDeBanho}
              onSelect={(selectedItem, index) =>
                setSelectedToilet(selectedItem.value)
              }
              defaultButtonText="--"
              buttonTextAfterSelection={(selectedItem, index) =>
                selectedItem.label
              }
              rowTextForSelection={(item, index) => item.label}
              buttonStyle={styles.input}
            />

            <Text style={styles.label}>Pequeno almoço</Text>
            <SelectDropdown
              data={listPA}
              onSelect={(selectedItem, index) =>
                setSelectedPA(selectedItem.value)
              }
              defaultButtonText="--"
              buttonTextAfterSelection={(selectedItem, index) =>
                selectedItem.label
              }
              rowTextForSelection={(item, index) => item.label}
              buttonStyle={styles.input}
            />

            <Text style={styles.label}>Almoço</Text>
            <SelectDropdown
              data={listPA}
              onSelect={(selectedItem, index) =>
                setSelectedAlmoco(selectedItem.value)
              }
              defaultButtonText="--"
              buttonTextAfterSelection={(selectedItem, index) =>
                selectedItem.label
              }
              rowTextForSelection={(item, index) => item.label}
              buttonStyle={styles.input}
            />

            <Text style={styles.label}>Jantar</Text>
            <SelectDropdown
              data={listPA}
              onSelect={(selectedItem, index) =>
                setSelectedJantar(selectedItem.value)
              }
              defaultButtonText="--"
              buttonTextAfterSelection={(selectedItem, index) =>
                selectedItem.label
              }
              rowTextForSelection={(item, index) => item.label}
              buttonStyle={styles.input}
            />

            <Text style={styles.label}>Atividade Física</Text>
            <SelectDropdown
              data={listAtvFisica}
              onSelect={(selectedItem, index) =>
                setSelectedAtvFisica(selectedItem.value)
              }
              defaultButtonText="--"
              buttonTextAfterSelection={(selectedItem, index) =>
                selectedItem.label
              }
              rowTextForSelection={(item, index) => item.label}
              buttonStyle={styles.input}
            />
          </CollapseBody>

          <Text style={styles.label}>Pontuação diária</Text>
          <StarRatingComponent rating={rating} setRating={setRating} />
        </Collapse>

        <Text style={styles.label}>Anotações gerais</Text>
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
  disabledTextInput: {
    backgroundColor: '#f2f2f2',
    color: 'gray',
    borderRadius: 4,
    height: 30,
    borderColor: '#666666',
    borderWidth: 0,
    borderRadius: 6,
    fontSize: 18,
    padding: 9,
  },
  dateGroup: {
    width: '90%',
    height: 50,
    borderColor: '#666666',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 16,
    padding: 9,
  },
  datePicker: {
    width: '50%',
    height: 30,
    borderColor: '#666666',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 16,
    padding: 9,
    color: 'black',
  },
  labelDate: {
    backgroundColor: 'gray',
    height: 30,
    borderColor: '#666666',
    borderWidth: 1,
    borderRadius: 6,
    padding: 4,
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
  inputMin: {
    width: '30%',
    height: 50,
    borderColor: '#666666',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 16,
    marginLeft: 4,
    padding: 9,
  },
  inputMed: {
    width: '60%',
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
  group: {
    borderColor: '#666666',
    width: '100%',
    borderWidth: 1,
    borderRadius: 6,
    borderStyle: 'dotted',
    padding: 20,
  },
  groupHeader: {
    borderColor: '#666666',
    width: '100%',
    borderWidth: 1,
    borderRadius: 6,
    borderStyle: 'dotted',
    padding: 20,
    backgroundColor: '#D3D3D3',
  },
  groupMain: {
    borderColor: '#666666',
    width: '90%',
    marginBottom: 20,
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
  nameFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeButton: {
    backgroundColor: '#ff6347',
    padding: 5,
    borderRadius: 6,
    marginLeft: 10,
  },
});

export default AddRegisto;
